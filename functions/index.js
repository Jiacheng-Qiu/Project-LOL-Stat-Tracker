// TODO: PROPER PLAN FOR THE FUNCTIONS AND THEIR FUNCTIONALITY

const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

let {
  FB_COL_SUMMONERS,
  FB_FIELD_SUMMONER_ID,
  FB_FIELD_IS_LIVE,
  FB_FIELD_ACCOUNT_ID,
  FB_FIELD_SUMMONER_TIER,
  FB_FIELD_SUMMONER_RANK,
  FB_FIELD_SUMMONER_WINS,
  FB_FIELD_SUMMONER_LOSSES,
  FB_FIELD_SUMMONER_LP,
  FB_FIELD_QUEUE_TYPE,
  FB_FIELD_SUMMONER_LEAGUES,
  FB_FIELD_SUMMONER_MATCHES,

  FB_FIELD_TIMESTAMP,

  CONST_RANKED_SOLO,
  CONST_RANKED_FLEX,

  FB_COL_USERS,
  FB_FIELD_FAVORITES,

  FB_COL_MATCHES,
  FB_COL_LIVE_MATCHES,
} = require("./constants");

let {
  extractKeys,
  getSummonerByName,
  getSummonerLeagueByID,
  getMatchByID,
  getMatchesByAccountID,
  parseMatch,
  getSummonerLiveGameByID,
} = require("./utils");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const LOGARGS = { structuredData: true };
const COOLDOWN = 15;

let print = (arg) => {
  functions.logger.info(arg);
};

// promise.all
// store array of matches
let checkMatch = async (matchID, region, batch) => {
  let dbMatchID = region + matchID;
  try {
    let dbRef = await admin
      .firestore()
      .collection(FB_COL_MATCHES)
      .doc(dbMatchID)
      .get();

    print("checking if match dbRef exists");
    if (!dbRef.exists) {
      print("match does not exist in DB");

      let data = await getMatchByID(region, matchID);
      data = parseMatch(data);
      const matchRef = admin
        .firestore()
        .collection(FB_COL_MATCHES)
        .doc(dbMatchID);
      batch.set(matchRef, data);

      return data;
    } else {
      print("match exists in DB");
      return dbRef.data();
    }
  } catch (err) {
    return { err };
  }
};

/**
 * @param  {} data    {"summonerName": "FwiedWice", region:"na1"}
 * @param  {} context auth context (automatic)
 */
exports.followPlayer = functions.https.onCall(async (data, context) => {
  let summonerName = data.summonerName.trim().toLowerCase();
  let region = data.region.trim().toLowerCase();

  if (context.auth === null || context.auth.uid === null) {
    return { suc: false };
  }

  let dbSummonerID = region + summonerName;

  try {
    await admin
      .firestore()
      .collection(FB_COL_USERS)
      .doc(context.auth.uid)
      .update({
        [FB_FIELD_FAVORITES]: admin.firestore.FieldValue.arrayUnion(
          dbSummonerID
        ),
      });

    return { suc: true };
  } catch (err) {
    return { suc: false };
  }
});

/**
 * @param  {} data    {"summonerName": "FwiedWice", region:"na1"}
 * @param  {} context auth context (automatic)
 */
exports.unfollowPlayer = functions.https.onCall(async (data, context) => {
  let summonerName = data.summonerName.trim().toLowerCase();
  let region = data.region.trim().toLowerCase();

  if (context.auth === null || context.auth.uid === null) {
    return { suc: false };
  }

  let dbSummonerID = region + summonerName;

  try {
    await admin
      .firestore()
      .collection(FB_COL_USERS)
      .doc(context.auth.uid)
      .update({
        [FB_FIELD_FAVORITES]: admin.firestore.FieldValue.arrayRemove(
          dbSummonerID
        ),
      });

    return { suc: true };
  } catch (err) {
    return { suc: false };
  }
});

/**›
 * @param  {} data    {"summonerName": "FwiedWice", region:"na1"}
 * @param  {} context auth context (automatic)
 */
exports.doesFollow = functions.https.onCall(async (data, context) => {
  let summonerName = data.summonerName.trim().toLowerCase();
  let region = data.region.trim().toLowerCase();

  if (context.auth === null || context.auth.uid === null) {
    return { follows: null };
  }

  let dbSummonerID = region + summonerName;
  try {
    let dbRef = await admin
      .firestore()
      .collection(FB_COL_USERS)
      .doc(context.auth.uid)
      .get();

    let favorites = dbRef.data()[FB_FIELD_FAVORITES];

    return { follows: favorites.includes(dbSummonerID) };
  } catch (err) {
    return { follows: null, err };
  }
});

/**
 * @param  {} data      {summonerName: "FwiedWice", region: "NA1", fetchMatch: true}
 * @param  {} context   auth context (automatic)
 *
 * { inLive: true } if succesfull
 */

/**
 * @param  {} data      {summonerName: "FwiedWice", region: "NA1", fetchMatch: true}
 * @param  {} context   auth context (automatic)
 *
 * initial fetching of summoner data first time they are in the DB
 */
exports.getSummonerFull = functions.https.onCall(async (data, context) => {
  let summonerName = data.summonerName.trim().toLowerCase();
  let region = data.region.trim().toLowerCase();
  let fetchMatch = data.fetchMatch;

  let dbSummonerID = region + summonerName;
  print("dbSummonerID:", dbSummonerID);
  try {
    let dbRef = await admin
      .firestore()
      .collection(FB_COL_SUMMONERS)
      .doc(dbSummonerID)
      .get();

    let summonerID = "placeholder";
    let accountID = "placeholder";
    let summonerInfo = {};

    // if ref doesnt exist, we pull the data
    // if ref exists, and it's been more than COOLDOWN since we last pulled, we pull the data
    // if ref exists, and it's been less than COOLDOWN, we return what we have stored in the DB

    print("checking if summoner dbRef exists");
    if (!dbRef.exists) {
      print("New summoner entry");
      summonerInfo = await getSummonerByName(region, summonerName);
      if (summonerInfo.err) {
        print("getSummonerByName Error:");
        print(summonerInfo.err);
        return { err: summonerInfo.err };
      }
      summonerID = summonerInfo[FB_FIELD_SUMMONER_ID];
    } else {
      print("Exists in DB already");
      summonerInfo = dbRef.data();

      // 60 second timer currently, can't pull summoner profile too often for fear of rate limit
      let lastPulled = summonerInfo[FB_FIELD_TIMESTAMP]["seconds"];
      let current = Math.round(Date.now() / 1000);
      print("Last fetched: " + (current - lastPulled) + " seconds ago.");
      if (current - lastPulled < COOLDOWN) {
        print(
          "Can't fetch twice in a minute, returning locally stored values."
        );
        return summonerInfo;
      }
    }

    summonerID = summonerInfo[FB_FIELD_SUMMONER_ID];
    accountID = summonerInfo[FB_FIELD_ACCOUNT_ID];

    let isLive = await getSummonerLiveGameByID(region, summonerID);

    // get summoner leagues (SOLO/DUO, FLEX)
    print("Getting summoner leagues");
    let summonerLeagues = await getSummonerLeagueByID(region, summonerID);
    if (summonerLeagues.err) {
      print("getSummonerLeagueByID Error:");
      print(summonerLeagues.err);
      return { err: summonerLeagues.err };
    }

    let summoner = {
      ...summonerInfo,
      isLive,
      [FB_FIELD_SUMMONER_LEAGUES]: summonerLeagues,
      [FB_FIELD_TIMESTAMP]: admin.firestore.Timestamp.now(),
    };

    if (fetchMatch) {
      try {
        let batch = admin.firestore().batch();
        let rawMatches = await getMatchesByAccountID(region, accountID, 0);

        let matchesData = await Promise.all(
          rawMatches["matches"].map(async (rawMatch) => {
            let matchData = await checkMatch(rawMatch["gameId"], region, batch);
            return matchData;
          })
        );

        print("Pushing batch with matches");
        await batch.commit();
        summoner[FB_FIELD_SUMMONER_MATCHES] = rawMatches["matches"].map(
          (rawMatch) => region + rawMatch["gameId"]
        );
      } catch (err) {
        print("Error fetching matches");
      }
    }

    await admin
      .firestore()
      .collection(FB_COL_SUMMONERS)
      .doc(dbSummonerID)
      .set(summoner, { merge: true });

    return summoner;
  } catch (err) {
    print("getSummonerFull Error:");
    print(err);
    return { err };
  }
});

/**
 * @param  {} user
 *
 * automatically gets called when user registers
 */
exports.setupUser = functions.auth.user().onCreate(async (user) => {
  let uid = user.uid;
  print(uid);
  try {
    let dbRef = admin.firestore().collection(FB_COL_USERS).doc(uid);

    let basicUser = {
      favorites: [],
    };
    await dbRef.set(basicUser);
    print("Finished setting up user");
  } catch (err) {
    print(err);
    return { err };
  }
});

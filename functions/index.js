// TODO: PROPER PLAN FOR THE FUNCTIONS AND THEIR FUNCTIONALITY

const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

let {
  FB_COL_SUMMONERS,
  FB_FIELD_SUMMONER_ID,
  FB_FIELD_SUMMONER_TIER,
  FB_FIELD_SUMMONER_RANK,
  FB_FIELD_SUMMONER_WINS,
  FB_FIELD_SUMMONER_LOSSES,
  FB_FIELD_SUMMONER_LP,
  FB_FIELD_QUEUE_TYPE,
  FB_FIELD_SUMMONER_LEAGUES,

  FB_FIELD_TIMESTAMP,

  CONST_RANKED_SOLO,
  CONST_RANKED_FLEX,

  FB_COL_USERS,
  FB_COL_MATCHES,
  FB_COL_LIVE_MATCHES,
} = require("./constants");

let {
  extractKeys,
  getSummonerByName,
  getSummonerLeagueByID,
} = require("./utils");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const LOGARGS = { structuredData: true };
const COOLDOWN = 60;
let print = (arg) => {
  functions.logger.info(arg);
};

/**
 * @param  {} data      {summonerName: "FwiedWice", region: "NA1", fetchMatch: false}
 * @param  {} context   auth context
 *
 * initial fetching of summoner data first time they are in the DB
 */
exports.getSummonerFull = functions.https.onCall(async (data, context) => {
  let summonerName = data.summonerName.trim().toLowerCase();
  let region = data.region;
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
    let summonerInfo = {};

    // if ref doesnt exist, we pull the data
    // if ref exists, and it's been more than COOLDOWN since we last pulled, we pull the data
    // if ref exists, and it's been less than COOLDOWN, we return what we have stored in the DB
    print("checking if dbRef exists");
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
      let data = dbRef.data();

      // 60 second timer currently, can't pull summoner profile too often for fear of rate limit
      let lastPulled = data[FB_FIELD_TIMESTAMP]["seconds"];
      let current = Math.round(Date.now() / 1000);
      print("Last fetched: " + (current - lastPulled) + " seconds ago.");
      if (current - lastPulled < COOLDOWN) {
        print(
          "Can't fetch twice in a minute, returning locally stored values."
        );
        return data;
      }
      summonerID = data[FB_FIELD_SUMMONER_ID];
    }

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
      [FB_FIELD_SUMMONER_LEAGUES]: summonerLeagues,
      [FB_FIELD_TIMESTAMP]: admin.firestore.Timestamp.now(),
    };

    await admin
      .firestore()
      .collection(FB_COL_SUMMONERS)
      .doc(dbSummonerID)
      .set(summoner, { merge: true });

    if (fetchMatch) {
      console.log("fetchmatch");
    }
    return summoner;
  } catch (err) {
    print("getSummonerFull Error:");
    print(err);
    return { err };
  }
});

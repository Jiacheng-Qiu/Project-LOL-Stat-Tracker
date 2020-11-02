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

/**
 * @param  {} data      {summonerName: "FwiedWice", region: "NA1"}
 * @param  {} context   auth context
 *
 * initial fetching of summoner data first time they are in the DB
 */
exports.getSummonerFull = functions.https.onCall(async (data, context) => {
  let summonerName = data.summonerName;
  let region = data.region;

  let dbSummonerID = region + summonerName;
  try {
    let summonerInfo = await getSummonerByName(region, summonerName);
    if (summonerInfo.err) {
      return { err: summonerInfo.err };
    }
    let summonerId = summonerInfo[FB_FIELD_SUMMONER_ID];

    let summonerLeagues = await getSummonerLeagueByID(region, summonerId);
    if (summonerLeagues.err) {
      return { err: summonerLeagues.err };
    }

    let desiredFields = [
      FB_FIELD_SUMMONER_TIER,
      FB_FIELD_SUMMONER_RANK,
      FB_FIELD_SUMMONER_WINS,
      FB_FIELD_SUMMONER_LOSSES,
      FB_FIELD_SUMMONER_LP,
    ];

    let summonerLeaguesFiltered = {};

    summonerLeagues.map((summonerLeague) => {
      let queueType = summonerLeague[FB_FIELD_QUEUE_TYPE];
      summonerLeaguesFiltered[queueType] = extractKeys(
        desiredFields,
        summonerLeague
      );
    });

    let summoner = {
      ...summonerInfo,
      [FB_FIELD_SUMMONER_LEAGUES]: summonerLeaguesFiltered,
      [FB_FIELD_TIMESTAMP]: admin.firestore.Timestamp.now(),
    };

    await admin
      .firestore()
      .collection(FB_COL_SUMMONERS)
      .doc(dbSummonerID)
      .set(summoner);

    return summoner;
  } catch (err) {
    return { err };
  }
});

/**
 * @param  {} data      {summonerName: "FwiedWice", region: "NA1"}
 * @param  {} context   auth context
 */
exports.retrieveProfile = functions.https.onCall(async (data, context) => {
  // 15 second cooldown for testing
});

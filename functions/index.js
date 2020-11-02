// TODO: PROPER PLAN FOR THE FUNCTIONS AND THEIR FUNCTIONALITY

const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

let ***REMOVED***
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
***REMOVED*** = require("./constants");

let ***REMOVED***
  extractKeys,
  getSummonerByName,
  getSummonerLeagueByID,
***REMOVED*** = require("./utils");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => ***REMOVED***
//   functions.logger.info("Hello logs!", ***REMOVED***structuredData: true***REMOVED***);
//   response.send("Hello from Firebase!");
// ***REMOVED***);

/**
 * @param  ***REMOVED******REMOVED*** data      ***REMOVED***summonerName: "FwiedWice", region: "NA1"***REMOVED***
 * @param  ***REMOVED******REMOVED*** context   auth context
 *
 * initial fetching of summoner data first time they are in the DB
 */
exports.getSummonerFull = functions.https.onCall(async (data, context) => ***REMOVED***
  let summonerName = data.summonerName;
  let region = data.region;

  let dbSummonerID = region + summonerName;
  try ***REMOVED***
    let summonerInfo = await getSummonerByName(region, summonerName);
    if (summonerInfo.err) ***REMOVED***
      return ***REMOVED*** err: summonerInfo.err ***REMOVED***;
    ***REMOVED***
    let summonerId = summonerInfo[FB_FIELD_SUMMONER_ID];

    let summonerLeagues = await getSummonerLeagueByID(region, summonerId);
    if (summonerLeagues.err) ***REMOVED***
      return ***REMOVED*** err: summonerLeagues.err ***REMOVED***;
    ***REMOVED***

    let desiredFields = [
      FB_FIELD_SUMMONER_TIER,
      FB_FIELD_SUMMONER_RANK,
      FB_FIELD_SUMMONER_WINS,
      FB_FIELD_SUMMONER_LOSSES,
      FB_FIELD_SUMMONER_LP,
    ];

    let summonerLeaguesFiltered = ***REMOVED******REMOVED***;

    summonerLeagues.map((summonerLeague) => ***REMOVED***
      let queueType = summonerLeague[FB_FIELD_QUEUE_TYPE];
      summonerLeaguesFiltered[queueType] = extractKeys(
        desiredFields,
        summonerLeague
      );
    ***REMOVED***);

    let summoner = ***REMOVED***
      ...summonerInfo,
      [FB_FIELD_SUMMONER_LEAGUES]: summonerLeaguesFiltered,
      [FB_FIELD_TIMESTAMP]: admin.firestore.Timestamp.now(),
    ***REMOVED***;

    await admin
      .firestore()
      .collection(FB_COL_SUMMONERS)
      .doc(dbSummonerID)
      .set(summoner);

    return summoner;
  ***REMOVED*** catch (err) ***REMOVED***
    return ***REMOVED*** err ***REMOVED***;
  ***REMOVED***
***REMOVED***);

/**
 * @param  ***REMOVED******REMOVED*** data      ***REMOVED***summonerName: "FwiedWice", region: "NA1"***REMOVED***
 * @param  ***REMOVED******REMOVED*** context   auth context
 */
exports.retrieveProfile = functions.https.onCall(async (data, context) => ***REMOVED***
  // 15 second cooldown for testing
***REMOVED***);

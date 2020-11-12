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
const LOGARGS = ***REMOVED*** structuredData: true ***REMOVED***;
const COOLDOWN = 60;
let print = (arg) => ***REMOVED***
  functions.logger.info(arg);
***REMOVED***;

/**
 * @param  ***REMOVED******REMOVED*** data      ***REMOVED***summonerName: "FwiedWice", region: "NA1", fetchMatch: false***REMOVED***
 * @param  ***REMOVED******REMOVED*** context   auth context
 *
 * initial fetching of summoner data first time they are in the DB
 */
exports.getSummonerFull = functions.https.onCall(async (data, context) => ***REMOVED***
  let summonerName = data.summonerName.trim().toLowerCase();
  let region = data.region;
  let fetchMatch = data.fetchMatch;

  let dbSummonerID = region + summonerName;
  print("dbSummonerID:", dbSummonerID);
  try ***REMOVED***
    let dbRef = await admin
      .firestore()
      .collection(FB_COL_SUMMONERS)
      .doc(dbSummonerID)
      .get();

    let summonerID = "placeholder";
    let summonerInfo = ***REMOVED******REMOVED***;

    // if ref doesnt exist, we pull the data
    // if ref exists, and it's been more than COOLDOWN since we last pulled, we pull the data
    // if ref exists, and it's been less than COOLDOWN, we return what we have stored in the DB
    print("checking if dbRef exists");
    if (!dbRef.exists) ***REMOVED***
      print("New summoner entry");
      summonerInfo = await getSummonerByName(region, summonerName);
      if (summonerInfo.err) ***REMOVED***
        print("getSummonerByName Error:");
        print(summonerInfo.err);
        return ***REMOVED*** err: summonerInfo.err ***REMOVED***;
      ***REMOVED***
      summonerID = summonerInfo[FB_FIELD_SUMMONER_ID];
    ***REMOVED*** else ***REMOVED***
      print("Exists in DB already");
      let data = dbRef.data();

      // 60 second timer currently, can't pull summoner profile too often for fear of rate limit
      let lastPulled = data[FB_FIELD_TIMESTAMP]["seconds"];
      let current = Math.round(Date.now() / 1000);
      print("Last fetched: " + (current - lastPulled) + " seconds ago.");
      if (current - lastPulled < COOLDOWN) ***REMOVED***
        print(
          "Can't fetch twice in a minute, returning locally stored values."
        );
        return data;
      ***REMOVED***
      summonerID = data[FB_FIELD_SUMMONER_ID];
    ***REMOVED***

    // get summoner leagues (SOLO/DUO, FLEX)
    print("Getting summoner leagues");
    let summonerLeagues = await getSummonerLeagueByID(region, summonerID);
    if (summonerLeagues.err) ***REMOVED***
      print("getSummonerLeagueByID Error:");
      print(summonerLeagues.err);
      return ***REMOVED*** err: summonerLeagues.err ***REMOVED***;
    ***REMOVED***

    let summoner = ***REMOVED***
      ...summonerInfo,
      [FB_FIELD_SUMMONER_LEAGUES]: summonerLeagues,
      [FB_FIELD_TIMESTAMP]: admin.firestore.Timestamp.now(),
    ***REMOVED***;

    await admin
      .firestore()
      .collection(FB_COL_SUMMONERS)
      .doc(dbSummonerID)
      .set(summoner, ***REMOVED*** merge: true ***REMOVED***);

    if (fetchMatch) ***REMOVED***
      console.log("fetchmatch");
    ***REMOVED***
    return summoner;
  ***REMOVED*** catch (err) ***REMOVED***
    print("getSummonerFull Error:");
    print(err);
    return ***REMOVED*** err ***REMOVED***;
  ***REMOVED***
***REMOVED***);

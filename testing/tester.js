const firebase = require("firebase");

let ***REMOVED***
  getSummonerByName,
  getSummonerLeagueByID,
  getSummonerLiveGameByID,
  getMatchesByAccountID,
  extractKeys,
  getMatchByID,
***REMOVED*** = require("../functions/utils");

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

  FB_COL_USERS,
  FB_COL_MATCHES,
  FB_COL_LIVE_MATCHES,
***REMOVED*** = require("../functions/constants");

// Required for side-effects
require("firebase/functions");

// var serviceAccount = require("../lol-stat-tracker-firebase-adminsdk.json");
// var app = admin.initializeApp(***REMOVED***
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://lol-stat-tracker.firebaseio.com",
// ***REMOVED***);

var app = firebase.initializeApp(***REMOVED***
  apiKey: "AIzaSyAHsmkC1CNF77JsbiD3os8bsiveNd5kFb8",
  authDomain: "lol-stat-tracker.firebaseapp.com",
  databaseURL: "https://lol-stat-tracker.firebaseio.com",
  projectId: "lol-stat-tracker",
  storageBucket: "lol-stat-tracker.appspot.com",
  messagingSenderId: "1083535752801",
  appId: "1:1083535752801:web:d06df1435ad94b9b0ef420",
  measurementId: "G-5HCPXWN7QB",
***REMOVED***);

// Initialize Cloud Functions through Firebase
var functions = firebase.functions();

var testCall = firebase.functions().httpsCallable("getSummonerFull");

let print = (args) => console.log(args);

let testFunc = async (data) => ***REMOVED******REMOVED***;

let main = async () => ***REMOVED***
  // let smt = await getSummonerLiveGameByID(
  //   "NA1",
  //   "mmHHYsMn6SviKeJ86CTboLxuNZc4xYpo2alZmxGrkqpmgh8"
  // );
  // let smt = await testFunc(***REMOVED*** summonerName: "PerfectSniper", region: "EUN1" ***REMOVED***);
  // console.log(smt);
  // console.log("finish");
  // testCall(***REMOVED*** summonerName: "PerfECTsniper", region: "eun1" ***REMOVED***)
  //   .then(function (result) ***REMOVED***
  //     // Read result of the Cloud Function.
  //     console.warn(result.data);
  //     // ...
  //   ***REMOVED***)
  //   .catch((err) => ***REMOVED***
  //     console.log(err);
  //   ***REMOVED***);
  // console.log(extractKeys(["a", "b"], ***REMOVED*** a: 0, b: 1, c: 2 ***REMOVED***));
  // console.log("\n\n");
  // console.log(await getSummonerByName("NA1", "fwiedwice"));
  // console.log("\n\n");
  // console.log(
  //   await getSummonerLeagueByID(
  //     "NA1",
  //     "Y4SvXN2TleUX4Wc5ZMB7McPSpVtCXwIm-bCgpVZLq6qRUQo"
  //   )
  // );

  // console.log(
  //   await getMatchesByAccountID(
  //     "eun1",
  //     "Z_zUtoY1BrgKLHzj1EIMxcBJWGVS0fenZIg_bmvbqjFjDic",
  //     0
  //   )
  // );
  console.log(await getMatchByID("eun1", "2630126100"));
***REMOVED***;

main();

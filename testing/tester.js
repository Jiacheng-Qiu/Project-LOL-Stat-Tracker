const firebase = require("firebase");

let {
  getSummonerByName,
  getSummonerLeagueByID,
  extractKeys,
} = require("../functions/utils");

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

  FB_COL_USERS,
  FB_COL_MATCHES,
  FB_COL_LIVE_MATCHES,
} = require("../functions/constants");

// Required for side-effects
require("firebase/functions");

// var serviceAccount = require("../lol-stat-tracker-firebase-adminsdk.json");
// var app = admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://lol-stat-tracker.firebaseio.com",
// });

firebase.initializeApp({
  apiKey: "AIzaSyAHsmkC1CNF77JsbiD3os8bsiveNd5kFb8",
  authDomain: "lol-stat-tracker.firebaseapp.com",
  databaseURL: "https://lol-stat-tracker.firebaseio.com",
  projectId: "lol-stat-tracker",
  storageBucket: "lol-stat-tracker.appspot.com",
  messagingSenderId: "1083535752801",
  appId: "1:1083535752801:web:d06df1435ad94b9b0ef420",
  measurementId: "G-5HCPXWN7QB",
});

// Initialize Cloud Functions through Firebase
var functions = firebase.functions();

var testCall = firebase.functions().httpsCallable("getSummonerFull");

let testFunc = async (data) => {};

let main = async () => {
  // let smt = await testFunc({ summonerName: "PerfectSniper", region: "EUN1" });
  // console.log(smt);
  testCall({ summonerName: "FwiedWice", region: "NA1" }).then(function (
    result
  ) {
    // Read result of the Cloud Function.
    var sanitizedMessage = result.data;
    console.warn(sanitizedMessage);
    // ...
  });

  // console.log(extractKeys(["a", "b"], { a: 0, b: 1, c: 2 }));
  // console.log("\n\n");
  // console.log(await getSummonerByName("NA1", "FwiedWice"));

  // console.log("\n\n");
  // console.log(
  //   await getSummonerLeagueByID(
  //     "NA1",
  //     "qf448ol_kx-u491ShYQTcCBdSTwtKtHlzHNhm3lN9OAsJ58"
  //   )
  // );
};

main();

// libraries
const req = require("superagent");

let ***REMOVED***
  FB_COL_SUMMONERS,
  FB_COL_USERS,
  FB_COL_MATCHES,
  FB_COL_LIVE_MATCHES,
***REMOVED*** = require("./constants");

// constants
const KEY = require("../riotkey.json")["key"];
const ARGS = ***REMOVED***
  "X-Riot-Token": KEY,
***REMOVED***;

let getSummonerByName = async (region, summonerName) => ***REMOVED***
  try ***REMOVED***
    let requestURL = `https://$***REMOVED***region***REMOVED***.api.riotgames.com/lol/summoner/v4/summoners/by-name/$***REMOVED***summonerName***REMOVED***`;
    let response = await req.get(requestURL).set(ARGS);

    console.log(response.body);
  ***REMOVED*** catch (err) ***REMOVED***
    console.log(err);
  ***REMOVED***
***REMOVED***;

let getSummonerLeagueByID = async (region, summonerID) => ***REMOVED***
  try ***REMOVED***
    let requestURL = `https://$***REMOVED***region***REMOVED***.api.riotgames.com/lol/league/v4/entries/by-summoner/$***REMOVED***summonerID***REMOVED***`;
    let response = await req.get(requestURL).set(ARGS);

    console.log(response.body);
  ***REMOVED*** catch (err) ***REMOVED***
    console.log(err);
  ***REMOVED***
***REMOVED***;

// getSummonerByName("NA1", "FwiedWice");
getSummonerLeagueByID("NA1", "qf448ol_kx-u491ShYQTcCBdSTwtKtHlzHNhm3lN9OAsJ58");

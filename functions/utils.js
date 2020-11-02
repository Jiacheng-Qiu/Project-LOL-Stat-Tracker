// libraries
const req = require("superagent");

let ***REMOVED***
  FB_COL_SUMMONERS,
  FB_COL_USERS,
  FB_COL_MATCHES,
  FB_COL_LIVE_MATCHES,
***REMOVED*** = require("./constants");

// constants
const KEY = require("./riotkey.json")["key"];
const ARGS = ***REMOVED***
  "X-Riot-Token": KEY,
***REMOVED***;

/**
 * @param  ***REMOVED******REMOVED*** keys    list of keys
 * @param  ***REMOVED******REMOVED*** dict    dictionary
 *
 * returns a filtered version of the dictionary with only desired keys
 */
exports.extractKeys = (keys, dict) => ***REMOVED***
  res = ***REMOVED******REMOVED***;
  for (let i = 0; i < keys.length; i++) ***REMOVED***
    res[keys[i]] = dict[keys[i]];
  ***REMOVED***

  return res;
***REMOVED***;
/**
 * @param  ***REMOVED******REMOVED*** region          region of player (NA1, EUN1, etc...)
 * @param  ***REMOVED******REMOVED*** summonerName    summoner name of player (FwiedWice, Emperdust, etc...)
 *
 * retrieves basic summoner info (all kinds of IDs)
 */
exports.getSummonerByName = async (region, summonerName) => ***REMOVED***
  try ***REMOVED***
    let requestURL = `https://$***REMOVED***region***REMOVED***.api.riotgames.com/lol/summoner/v4/summoners/by-name/$***REMOVED***summonerName***REMOVED***`;
    let response = await req.get(requestURL).set(ARGS);

    return response.body;
  ***REMOVED*** catch (err) ***REMOVED***
    console.log(err);
    return ***REMOVED*** err: err ***REMOVED***;
  ***REMOVED***
***REMOVED***;

/**
 * @param  ***REMOVED******REMOVED*** region      region of player (NA1, EUN1, etc...)
 * @param  ***REMOVED******REMOVED*** summonerID  summoner ID of player (retrieved from riot API)
 *
 * retrieves info about all leagues user is in (Solo, Flex)
 */
exports.getSummonerLeagueByID = async (region, summonerID) => ***REMOVED***
  try ***REMOVED***
    let requestURL = `https://$***REMOVED***region***REMOVED***.api.riotgames.com/lol/league/v4/entries/by-summoner/$***REMOVED***summonerID***REMOVED***`;
    let response = await req.get(requestURL).set(ARGS);

    return response.body;
  ***REMOVED*** catch (err) ***REMOVED***
    return ***REMOVED*** err: err ***REMOVED***;
  ***REMOVED***
***REMOVED***;

// libraries
const req = require("superagent");

let ***REMOVED***
  FB_COL_SUMMONERS,
  FB_COL_USERS,
  FB_COL_MATCHES,
  FB_FIELD_MATCH_REGION,
  FB_FIELD_MATCH_CREATION,
  FB_FIELD_MATCH_DURATION,
  FB_FIELD_MATCH_QUEUE_ID,
  FB_FIELD_MATCH_MAP_ID,
  FB_FIELD_MATCH_GAME_MODE,
  FB_FIELD_MATCH_GAME_TYPE,
  FB_COL_LIVE_MATCHES,
  FB_FIELD_SUMMONER_TIER,
  FB_FIELD_SUMMONER_RANK,
  FB_FIELD_SUMMONER_WINS,
  FB_FIELD_SUMMONER_LOSSES,
  FB_FIELD_SUMMONER_LP,
  FB_FIELD_QUEUE_TYPE,
***REMOVED*** = require("./constants");

// constants
const KEY = require("./riotkey.json")["key"];
const ARGS = ***REMOVED***
  "X-Riot-Token": KEY,
***REMOVED***;

const MATCH_COUNT = 3;

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
 * @param  ***REMOVED******REMOVED*** rawMatch
 * 
 * get desired match data format + fields
 */
exports.parseMatch = (rawMatch) => ***REMOVED***
  let keys = [
    FB_FIELD_MATCH_REGION,
    FB_FIELD_MATCH_CREATION,
    FB_FIELD_MATCH_DURATION,
    FB_FIELD_MATCH_QUEUE_ID,
    FB_FIELD_MATCH_MAP_ID,
    FB_FIELD_MATCH_GAME_MODE,
    FB_FIELD_MATCH_GAME_TYPE,
  ];
  let match = exports.extractKeys(keys, rawMatch);
  match = ***REMOVED***
    ...match,
    participants: ***REMOVED******REMOVED***,
    teams: ***REMOVED******REMOVED***,
  ***REMOVED***;

  let teams = rawMatch["teams"];
  teams.forEach((team) => ***REMOVED***
    let teamID = "" + team["teamId"];
    let win = team["win"] === "Win";
    match["teams"][teamID] = win;
  ***REMOVED***);

  // get player identity
  let participantIdentities = rawMatch["participantIdentities"];
  participantIdentities.forEach((participant) => ***REMOVED***
    let participantID = "" + participant["participantId"];
    match["participants"][participantID] = participant;
  ***REMOVED***);

  // get player stats
  let participantGameData = rawMatch["participants"];
  participantGameData.forEach((participant) => ***REMOVED***
    delete participant["timeline"];

    let participantID = "" + participant["participantId"];
    match["participants"][participantID]["gameData"] = participant;
  ***REMOVED***);

  return match;
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

    let desiredFields = [
      FB_FIELD_SUMMONER_TIER,
      FB_FIELD_SUMMONER_RANK,
      FB_FIELD_SUMMONER_WINS,
      FB_FIELD_SUMMONER_LOSSES,
      FB_FIELD_SUMMONER_LP,
    ];

    let summonerLeaguesFiltered = ***REMOVED******REMOVED***;

    response.body.map((summonerLeague) => ***REMOVED***
      let queueType = summonerLeague[FB_FIELD_QUEUE_TYPE];
      summonerLeaguesFiltered[queueType] = exports.extractKeys(
        desiredFields,
        summonerLeague
      );
    ***REMOVED***);

    return summonerLeaguesFiltered;
  ***REMOVED*** catch (err) ***REMOVED***
    return ***REMOVED*** err: err ***REMOVED***;
  ***REMOVED***
***REMOVED***;
/**
 * @param  ***REMOVED******REMOVED*** region          region
 * @param  ***REMOVED******REMOVED*** accountID       accountID of  player
 * @param  ***REMOVED******REMOVED*** beginIndex=0    beginIndex of matches
 */
exports.getMatchesByAccountID = async (region, accountID, beginIndex = 0) => ***REMOVED***
  let endIndex = beginIndex + MATCH_COUNT;

  try ***REMOVED***
    let requestURL =
      `https://$***REMOVED***region***REMOVED***.api.riotgames.com/lol/match/v4/matchlists/by-account/` +
      `$***REMOVED***accountID***REMOVED***?endIndex=$***REMOVED***endIndex***REMOVED***&beginIndex=$***REMOVED***beginIndex***REMOVED***`;
    let response = await req.get(requestURL).set(ARGS);
    return response.body;
  ***REMOVED*** catch (err) ***REMOVED***
    return ***REMOVED*** err ***REMOVED***;
  ***REMOVED***
***REMOVED***;

/**
 * @param  ***REMOVED******REMOVED*** region
 * @param  ***REMOVED******REMOVED*** summonerID
 */
exports.getSummonerLiveGameByID = async (region, summonerID) => ***REMOVED***
  try ***REMOVED***
    let requestURL = `https://$***REMOVED***region***REMOVED***.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/$***REMOVED***summonerID***REMOVED***`;
    let response = await req.get(requestURL).set(ARGS);
    return response.body;
  ***REMOVED*** catch (err) ***REMOVED***
    return ***REMOVED*** err ***REMOVED***;
  ***REMOVED***
***REMOVED***;

/**
 * @param  ***REMOVED******REMOVED*** region
 * @param  ***REMOVED******REMOVED*** matchID
 */
exports.getMatchByID = async (region, matchID) => ***REMOVED***
  try ***REMOVED***
    let requestURL = `https://$***REMOVED***region***REMOVED***.api.riotgames.com/lol/match/v4/matches/$***REMOVED***matchID***REMOVED***`;
    let response = await req.get(requestURL).set(ARGS);
    return response.body;
  ***REMOVED*** catch (err) ***REMOVED***
    return ***REMOVED*** err ***REMOVED***;
  ***REMOVED***
***REMOVED***;

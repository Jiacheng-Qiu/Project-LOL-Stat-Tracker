// libraries
const req = require("superagent");

let {
  FB_COL_SUMMONERS,
  FB_COL_USERS,
  FB_COL_MATCHES,
  FB_COL_LIVE_MATCHES,
} = require("./constants");

// constants
const KEY = require("./riotkey.json")["key"];
const ARGS = {
  "X-Riot-Token": KEY,
};

/**
 * @param  {} keys    list of keys
 * @param  {} dict    dictionary
 *
 * returns a filtered version of the dictionary with only desired keys
 */
exports.extractKeys = (keys, dict) => {
  res = {};
  for (let i = 0; i < keys.length; i++) {
    res[keys[i]] = dict[keys[i]];
  }

  return res;
};
/**
 * @param  {} region          region of player (NA1, EUN1, etc...)
 * @param  {} summonerName    summoner name of player (FwiedWice, Emperdust, etc...)
 *
 * retrieves basic summoner info (all kinds of IDs)
 */
exports.getSummonerByName = async (region, summonerName) => {
  try {
    let requestURL = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;
    let response = await req.get(requestURL).set(ARGS);

    return response.body;
  } catch (err) {
    console.log(err);
    return { err: err };
  }
};

/**
 * @param  {} region      region of player (NA1, EUN1, etc...)
 * @param  {} summonerID  summoner ID of player (retrieved from riot API)
 *
 * retrieves info about all leagues user is in (Solo, Flex)
 */
exports.getSummonerLeagueByID = async (region, summonerID) => {
  try {
    let requestURL = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerID}`;
    let response = await req.get(requestURL).set(ARGS);

    return response.body;
  } catch (err) {
    return { err: err };
  }
};

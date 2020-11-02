// libraries
const req = require("superagent");

let {
  FB_COL_SUMMONERS,
  FB_COL_USERS,
  FB_COL_MATCHES,
  FB_COL_LIVE_MATCHES,
} = require("./constants");

// constants
const KEY = require("../riotkey.json")["key"];
const ARGS = {
  "X-Riot-Token": KEY,
};

let getSummonerByName = async (region, summonerName) => {
  try {
    let requestURL = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;
    let response = await req.get(requestURL).set(ARGS);

    console.log(response.body);
  } catch (err) {
    console.log(err);
  }
};

let getSummonerLeagueByID = async (region, summonerID) => {
  try {
    let requestURL = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerID}`;
    let response = await req.get(requestURL).set(ARGS);

    console.log(response.body);
  } catch (err) {
    console.log(err);
  }
};

// getSummonerByName("NA1", "FwiedWice");
getSummonerLeagueByID("NA1", "qf448ol_kx-u491ShYQTcCBdSTwtKtHlzHNhm3lN9OAsJ58");

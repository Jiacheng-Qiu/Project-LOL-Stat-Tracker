const rawMatch = require("./sampleMatch.json");
const fs = require("fs");

const ***REMOVED*** parseMatch ***REMOVED*** = require("../functions/utils");

fs.writeFile(
  "output.json",
  JSON.stringify(parseMatch(rawMatch), null, 4),
  () => ***REMOVED******REMOVED***
);

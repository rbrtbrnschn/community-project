const router = require("express").Router();

const { MatchDB, matchSchema } = require("../models/match");
const Match = MatchDB.model("match", matchSchema);

module.exports = router;

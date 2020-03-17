//player
const router = require("express").Router();

const { PlayerDB, playerSchema } = require("../models/player");
const Player = PlayerDB.model("player", playerSchema);

module.exports = router;

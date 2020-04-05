const { sendMail } = require("../services/nodemailer/nodemailerSetup");
const { isAuth } = require("../services/middleware");
const { isLoggedIn } = require("../services/snippets");
const router = require("express").Router();
const { uri } = require("../config");
const fetch = require("node-fetch");

const { PlayerDB, playerSchema } = require("../models/player");
const Player = PlayerDB.model("player", playerSchema);
const { UserDB, userSchema } = require("../models/user");
const User = UserDB.model("user", userSchema);
import { withAuth, setUser } from "../services/middleware";

router.use(withAuth);
router.use(setUser);

// get player by username
router.get("/find/:key/:value", async (req, res) => {
  let { key, value } = req.params;
  switch (key) {
    case "username":
      key = "username_lower";
      value = value.toLowerCase();
      break;
    default:
      break;
  }
  const _player = await Player.findOne({ [key]: value });
  if (!_player) {
    return res.json({ status: 404, msg: "player not found", ok: true });
  } else {
    return res.json({ ..._player._doc, ok: true });
  }
  res.end();
});

//! get current player
router.get("/", async (req, res) => {
  if(req.user){
    const player = await Player.findOne({playerID:req.user.userID})
    return res.json({...player._doc,ok:true});
  }
  else{
    return res.json({status:401,msg:"not logged in", ok:false})
  }
});

// create new player
router.post("/new", async (req: any, res: any) => {
  const { userID, username } = req.body;
  const player = new Player({
    playerID: userID,
    username: username,
    username_lower: username.toLowerCase(),
    opponents: [],
    sockets: [],
    tasks: [],
    locale: "en",
  }).save((savedPlayer: any) => {
    return res.json(savedPlayer);
  });
});

// invite player
router.get("/invite/:queryValue", isAuth, async (req, res) => {
  const queryValue = req.params.queryValue.toLowerCase();
  const queryKey = !queryValue.includes("@") ? "username_lower" : "email";
  const isUsername = queryKey === "username_lower" ? true 
  : queryKey === "email" ? false : "ERROR"
  const _user = req.user;
  let _opponentPlayer = {};
  let _opponentUser = {};

  if (isUsername) {
    _opponentPlayer = await Player.findOne({ [queryKey]: queryValue });
    if (!_opponentPlayer)
      return res.json({ status: 404, msg: "player not found", ok: false });
    _opponentUser = await User.findOne({
      userID: _opponentPlayer.playerID
    });
  } else {
    _opponentUser = await User.findOne({ [queryKey]: queryValue });
  }
  const link =
    uri.hostname +
    "/api/player/invited?user=" +
    _user.userID +
    "&opponent=" +
    _opponentUser.userID;
  const sendOptions = {
    to: _opponentUser.email,
    title: `${_opponentUser.name} invited you!`,
    body: link
  };
  sendMail(sendOptions);
  return res.json({ status: 200, msg: "Found & Invited", ok: true });
});

// accept invitation
router.get("/invited", async (req, res) => {
  const { user, opponent } = req.query;
  const _player = await Player.findOne({ playerID: user });
  const _opponent = await Player.findOne({ playerID: opponent });

  if (req.user) {
    if (_player && _opponent) {
      const hasOpponent = _player.opponents.includes(opponent);
      const hasPlayer = _opponent.opponents.includes(user);
      if (!hasOpponent && !hasPlayer) {
        _player.opponents.push(opponent);
        _opponent.opponents.push(user);
        console.log(
          _player.username,
          "and",
          _opponent.username,
          "are now opponents."
        );

        // Create Match
        const url = uri.hostname + "/api/match/new";
        const matchOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ user: user, opponent: opponent })
        };
        const response = await fetch(url, matchOptions);
        const data = await response.json();
        // check data for socket id
        console.log(data);
        const { socketID } = data;

        _player.sockets.push(socketID);
        _opponent.sockets.push(socketID);
        _player.save();
        _opponent.save();

        return res.json({ status: 200, msg: "invite accepted", ok: true });
      } else {
        console.log("Already opponents");
        return res.json({
          status: 404,
          msg: "already opponents",
          ok: false
        });
      }
    }
  } else {
    return res.json({
      status: 404,
      msg: "not logged in",
      ok: true,
      matchup: { user: user, opponent: opponent }
    });
  }
});

router.get("/update/lastlogin", async (req: any, res: any) => {
  const key = Date.now();
  const player = await Player.findOne({ playerID: req.user.userID });
  console.log(new Date(key)," updated.")
  if (player) {
    player.lastLogin = key;
    player.markModified("lastLogin");
    player.save();
    return res.json(player);
  }
  return res.end();
});

module.exports = router;

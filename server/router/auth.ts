const router = require("express").Router();
const config = require("../config");

const passport = require("passport");
const passportSetup = require("../services/passport/index");
const discord = require("./auth/discord");
const google = require("./auth/google");
const local = require("./auth/local");

import { getUser } from "../services/snippets";
import { withAuth, setUser } from "../services/middleware";
router.use("/discord", discord);
router.use("/google", google);
router.use("/local",local);

// Logout route
router.get("/logout",(req, res) => {
  res.cookie("token", "", {
    maxAge: 0,
    expires: new Date(0),
    domain: "localhost",
    path: "/"
  });
  req.logout();
  res.redirect("/");
});
// Test Route
router.get("/", withAuth, setUser, async (req, res) => {
   if(req.user){
    return res.json(req.user);
  }
  else{
    return res.json({status:404,msg:"not logged in", ok:false})
  }
});

module.exports = router;


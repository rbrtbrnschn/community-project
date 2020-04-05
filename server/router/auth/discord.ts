const passport = require("passport");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const config = require("../../config");

router.get("/login", passport.authenticate("discord"));
router.get(
  "/redirect",
  passport.authenticate("discord", {
    failureRedirect: "/somethingwentwrong"
  }),
  function(req, res) {
    //issue token
    const id = req.user.userID;
    const payload = { id }
    const token = jwt.sign(payload,config.jwt.secret,{expiresIn: "1h"});
    res.cookie("token",token,{httpOnly: true})
    const redirect = "http://localhost:3000" 
    console.log("TOKEN ISSUED:",token,"|| REDIRECTED TO",redirect)
    res.redirect(redirect); // Successful auth
  }
);

module.exports = router;


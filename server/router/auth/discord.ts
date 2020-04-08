const passport = require("passport");
const router = require("express").Router();
const { signToken } = require("../../services/snippets");
const config = require("../../config");

router.get("/login", passport.authenticate("discord"));
router.get(
  "/redirect",
  passport.authenticate("discord", {
    failureRedirect: "/error"
  }),
  function(req, res) {
    //issue token
    const id = req.user.userID;
    const token = signToken({ id })
    res.cookie("token",token,{httpOnly: true, maxAge: config.cookies.token.maxAge})
    const redirect = "/" 
    res.redirect(redirect); // Successful auth
  }
);

module.exports = router;


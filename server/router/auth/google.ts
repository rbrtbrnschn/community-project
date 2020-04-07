const router = require("express").Router();
const passport = require("passport");
const { signToken } = require("../../services/snippets");
const config = require("../../config");

// passport.authenticate middleware is used here to authenticate the request
router.get(
  "/login",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ] // Used to specify the required data
  })
);

// The middleware receives the data from Google and runs the function on Strategy config
router.get("/redirect", passport.authenticate("google"), (req, res) => {
  //Issue Token
  const id = req.user.userID;
  const token = signToken({ id });
  res.cookie("token",token,{httpOnly: true, maxAge: config.cookies.token.maxAge}).status(200);

  res.redirect("/");
});

module.exports = router;


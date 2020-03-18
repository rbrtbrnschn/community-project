const router = require("express").Router();
const passport = require("passport");

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
  res.redirect("/");
});

module.exports = router;


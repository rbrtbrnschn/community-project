const passport = require("passport");

const DiscordStrategy = require("./discord");
const GoogleStrategy = require("./google");
const LocalStrategy = require("./local");
// Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
  done(null, user);
});


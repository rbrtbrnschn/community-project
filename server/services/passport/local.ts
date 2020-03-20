/* PASSPORT LOCAL AUTHENTICATION */

const { UserDB, userSchema } = require("../../models/user");
const User = UserDB.model("user", userSchema);

const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
      const isEmail = username.includes("@") ? true : false;
      const query = isEmail ? "email" : "oAuth.providerUsername";
	User.findOne({
        [query]: username
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (user.oAuth.providerPassword != password) {  
	return done(null, false);
        }
        return done(null, user);
      });
  }
));

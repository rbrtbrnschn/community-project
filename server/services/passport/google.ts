//! Import Collection & Models
const { UserDB, userSchema } = require("../../models/user");
const User = UserDB.model("user", userSchema);
const { PlayerDB, playerSchema } = require("../../models/player");
const Player = PlayerDB.model("player", playerSchema);

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const { uuid } = require("uuidv4");
const { google } = require("../../config")

// Strategy config
passport.use(
  new GoogleStrategy(
    {
      clientID: google.client.id,
      clientSecret: google.client.secret,
      callbackURL: google.client.callback
    },
    async (accessToken, refreshToken, profile, done) => {
      const currentUser = await User.findOne({
        email: profile.emails[0].value
      });
      if (!currentUser) {
        const __playerID = uuid();
        new User({
          userID: __playerID,
          name: profile.displayName,
          email: profile.emails[0].value,
          firstLogin: true,
          createdOn: Date.now(),
          oAuth: {
            provider: profile.provider,
            providerID: profile.id,
            providerUsername: profile.displayName,
            providerAvatar: profile.photos[0].value
          }
        })
          .save()
          .then(newUser => {
            new Player({
              playerID: __playerID,
              username: profile._json.given_name,
              opponents: [],
              tasks: [],
              locale: profile._json.locale
            })
              .save()
              .then(newPlayer => {
                console.log("Created Player:", newUser.name);
                done(null, { user: newUser, player: newPlayer }); // passes the profile data to serializeUser
              });
          });
      } else {
        done(null, currentUser); // passes the profile data to serializeUser
        console.log(currentUser.name, "logged in.");
      }
    }
  )
);


//! Import Collection & Models
const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;

const { UserDB, userSchema } = require("../../models/user");
const User = UserDB.model("user", userSchema);
const { PlayerDB, playerSchema } = require("../../models/player");
const Player = PlayerDB.model("player", playerSchema);

const { uuid } = require("uuidv4");
const { discord } = require("../../config");

passport.use(
  new DiscordStrategy(
    {
      clientID: discord.client.id,
      clientSecret: discord.client.secret,
      callbackURL: discord.client.callback,
      scope: ["identify", "email"]
    },
    async function(accessToken, refreshToken, profile, cb) {
      const currentUser = await User.findOne({ email: profile.email });
      if (!currentUser) {
        const __playerID = uuid();
        const { id, username, avatar, email, locale } = profile;
        new User({
          userID: __playerID,
	  name: username,
	  name_lower: username.toLowerCase(),
	  email: email.toLowerCase(),
          firstLogin: false,
          createdOn: Date.now(),
          oAuth: {
            provider: "discord",
            providerID: id,
	    providerUsername: username,
	    providerUsername_lower: username.toLowerCase(),
            providerAvatar: avatar
          }
        })
          .save()
          .then(newUser => {
            new Player({
              playerID: __playerID,
	      username: username,
	      username_lower: username.toLowerCase(),
              opponents: [],
              tasks: [],
              locale: locale
            })
              .save()
              .then(newPlayer => {
                const name =
                  newUser.name === "Discord User" ? username : newUser.name;
                console.log("Created Player:", name);
                return cb(null, newUser);
              });
          });
      } else {
        console.log(currentUser);
        return cb(null, currentUser);
      }
    }
  )
);


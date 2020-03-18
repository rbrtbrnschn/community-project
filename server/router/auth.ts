const router = require("express").Router();

const passport = require("passport");
const passportSetup = require("../services/passport/index");
const discord = require("./auth/discord");
const google = require("./auth/google");

router.use("/discord", discord);
router.use("/google", google);

// Logout route
router.get("/logout",(req, res) => {
  res.cookie("__matchID", "", {
    expires: new Date(0),
    domain: "localhost",
    path: "/"
  });

  req.logout();
  res.redirect("/");
});
// Test Route
router.get("/test", (req, res) => {
  if(req.user){
	return res.json(req.user);
  }
  else{
  	return res.json({status:404,msg:"not found"})
  }
  
});

// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.send("You must login!");
  }
}

module.exports = router;


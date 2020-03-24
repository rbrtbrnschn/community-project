const router = require("express").Router();

const passport = require("passport");
const passportSetup = require("../services/passport/index");
const discord = require("./auth/discord");
const google = require("./auth/google");
const local = require("./auth/local");

router.use("/discord", discord);
router.use("/google", google);
router.use("/local",local);

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
router.get("/", (req, res) => {
  if(req.user){
	return res.json({...req.user, ok:true});
  }
  else{
  	return res.json({status:404,msg:"not logged in",ok:false})
  }
  
});

module.exports = router;


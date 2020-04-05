const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../../config");

router.post("/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  function(req, res) {
    //Issue Token
    const id = req.user.userID;
    console.log(id, "has logged in");
    const payload = { id }
    const token = jwt.sign(payload,config.jwt.secret,{expiresIn: "1d"});
    res.cookie("token",token,{httpOnly: true}).status(200).json({ok:true, token:{key:"token",value:token,options:{httpOnly: true}}})
    

  });

module.exports = router;

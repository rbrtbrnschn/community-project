const router = require("express").Router();
const passport = require("passport");
const config = require("../../config");
const { signToken } = require("../../services/snippets"); 
const { cookies} = config;

router.post("/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  function(req, res) {
    //Issue Token
    const id = req.user.userID;
    
    //console.log(id, "has logged in");
    const token = signToken({ id });
    res.cookie("token",token,{httpOnly: true, maxAge: cookies.token.maxAge}).status(200).json({ok:true, token:{key:"token",value:token,options:{httpOnly: true}}})

  });

module.exports = router;

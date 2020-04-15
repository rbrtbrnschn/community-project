const router = require("express").Router();
const jwt = require("jsonwebtoken")
const config = require("../config.js");
const { UserDB, userSchema } = require("../models/user");
const User = UserDB.model("user", userSchema);
const { withAuth, setUser } = require("../services/middleware");

router.get("/test",(req,res)=>{
console.log("worked")
return res.send("worked");
})
router.post("/auth",async (req,res)=>{
  let {username,password} = req.body;
  if(!username){
  username = "test";
  password = "test";
  }
  const user = await User.findOne({"oAuth.providerUsername_lower":username,"oAuth.providerPassword":password})  
  if(!user){
    return res.status(401).json({msg: "incorrect password"})
  }
  if(user){
    //Issue Token
    const id = user.userID
    const payload = { id }
    const token = jwt.sign(payload,config.jwt.secret,{expiresIn: "1h"});
console.log(username, "logged in.")
    const event = new Date();
    event.setHours(event.getHours()+1);
    res.cookie("token",token,{httpOnly: true, maxAge: 3600000, domain: "localhost", path: "/"}).sendStatus(200); 
  }
})

router.get("/secret",withAuth, setUser, async (req,res)=>{
  return res.json(req.user);
})

module.exports = router;

const router = require("express").Router();
const jwt = require("jsonwebtoken")
const config = require("../config.js");
const { UserDB, userSchema } = require("../models/user");
const User = UserDB.model("user", userSchema);
const { withAuth, setUser } = require("../services/middleware");

router.post("/auth",async (req,res)=>{
  const {username,password} = req.body;
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
    res.cookie("token",token,{httpOnly: true}).sendStatus(200); 
  }
})

router.get("/secret",withAuth, setUser, async (req,res)=>{
  return res.json(req.user);
})

module.exports = router;

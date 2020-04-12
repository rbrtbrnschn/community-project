import { sendMail } from "../services/nodemailer";
import config from "../config";
import { withAuth, withAuthRedirect, setUser } from "../services/middleware";

const { uri } = config;
const router = require("express").Router();
const { PlayerDB, playerSchema } = require("../models/player");
const Player = PlayerDB.model("player", playerSchema);
const { UserDB, userSchema } = require("../models/user");
const User = UserDB.model("user", userSchema);

router.post("/invite/:email",withAuth, setUser, async (req,res)=>{
  const email = req.params.email.toLowerCase();
  const isEmail = email.includes("@");

  const player = !isEmail ? await Player.findOne({username_lower:email}) : null;
  const user = isEmail ? await User.findOne({email:email}) : await User.findOne({userID:player.playerID});
  const task = req.body
  const to = user.email;
  const title = "TodoHub Challenge Invite"
  const body = `<div><h1>Do you accept?</h1><hr><h2>${task.title}</h2><h4>${task.notes}</h4><h4>@${user.name}</h4><hr><p>${uri.client}/api/challenge/accept?user=${req.user.userID}&id=${task.id}</p></div>`
		  

  if(user){
  const options = {to:to,title:title,body:body}
		  sendMail(options)
  return res.json({email:user.email,ok:true});
  }
  else{
  return res.json({ok:false})
}
})

router.get("/accept", withAuthRedirect, setUser, async (req,res)=> {
	const { user, id } = req.query;
	const invitee = await Player.findOne({playerID:user});
	const {tasks} = invitee;
	const challenge = tasks.find(t=>t.id == id);
	challenge.notes = challenge.notes + ` | @${invitee.username}`
	challenge.streak = 0;
	challenge.strikes = 0;
	const player = await Player.findOne({playerID:req.user.userID});
	const exists = player.tasks.find(t=>t.id == id) ? true : false;
	if(exists)return res.json({status:401,msg:"id exists already",ok:false});		  
	player.tasks.push(challenge)
	player.markModified("tasks");
	player.save(saved=>{
		  res.redirect("/tasks")
		  })
})



module.exports = router;

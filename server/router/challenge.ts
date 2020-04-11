import { sendMail } from "../services/nodemailer";
const router = require("express").Router();
const { PlayerDB, playerSchema } = require("../models/player");
const Player = PlayerDB.model("player", playerSchema);
const { UserDB, userSchema } = require("../models/user");
const User = UserDB.model("user", userSchema);

router.post("/invite/:email",async (req,res)=>{
  const email = req.params.email.toLowerCase();
  const isEmail = email.includes("@");

  const player = !isEmail ? await Player.findOne({username_lower:email}) : null;
  const user = isEmail ? await User.findOne({email:email}) : await User.findOne({userID:player.playerID});
  const task = req.body
  const to = user.email;
  const title = "TodoHub Challenge Invite"
  const body = `<div><h1>Do you accept?</h1><hr><h2>${task.title}</h2><h4>${task.notes}</h4><h4>@${user.name}</h4><hr><p>http://localhost:3000/api/challenge/accept?user=${req.user.userID}&id=${task.id}</p></div>`
		  
  sendMail({to:to,title:title,body:body})

  if(user){
  return res.json({email:user.email,ok:true});
  }
  else{
  return res.json({ok:false})
}
})

router.get("/accept",async (req,res)=> {
	const { user, id } = req.query;
	const invitee = await Player.findOne({playerID:user});
	const {tasks} = invitee;
	const challenge = tasks.find(t=>t.id == id);
	challenge.streak = 0;
	challenge.strikes = 0;
	const player = await Player.findOne({playerID:req.user.userID});
	player.tasks.push(challenge)
	player.markModified("tasks");
	player.save(saved=>{
		  res.redirect("/tasks")
		  })
})



module.exports = router;

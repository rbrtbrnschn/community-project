//player
const router = require("express").Router();

const { PlayerDB, playerSchema } = require("../models/player");
const Player = PlayerDB.model("player", playerSchema);
const { UserDB, userSchema } = require("../models/user");
const User = UserDB.model("user", userSchema);


// get player by username
router.get("/find/:key/:value",async (req,res)=>{
	const { key, value } = req.params;

	const _player = await Player.findOne({[key]: value});
	if(!_player){return res.json({status:404,msg:"player not found",ok:true});}
	else{
		return res.json({..._player,ok:true});
	}
})

// create new player
router.post("/new",async (req,res)=>{
	const { userID,username } = req.body;
	const player = new Player({
		playerID: userID,
		username: username,
		opponents:[],
		tasks:[],
		locale: "en"

	})
	.save(savedPlayer =>{
		return res.json(savedPlayer);
	})
})

module.exports = router;

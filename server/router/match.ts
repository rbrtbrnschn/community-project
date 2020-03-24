const router = require("express").Router();
const { uuid } = require("uuidv4");

const { MatchDB, matchSchema } = require("../models/match");
const Match = MatchDB.model("match", matchSchema);


router.post("/new",async (req,res)=>{
	// Post Takes 2 Parameters playerID from each player
	const { user, opponent } = req.body;
	const matchID = uuid();
	// SocketID is a placeholder
	const socketID = Math.round(Math.random()* 10000)
	const now = Date.now();
	const timestamp = {
		stamp: now,
		payload: "onMatchCreate",
	}	

	// Create Match From Model
	const _match = new Match({
		matchID: matchID,
		socketID: socketID,
		collectionID: "matches",
		createdOn: new Date().toLocaleDateString(),
		timestamps: [timestamp],
		scores: []
	})
	_match.save();
	return res.json(_match);
	
})

router.post("/",async (req,res)=>{
	const sockets = req.body;
	let matches = []
	try{
	for(let socket of sockets){
		const _match = await Match.findOne({socketID:socket});
	matches.push(_match)
	}
	}
	catch(err){
	console.log(err);
	}
	return res.json(matches);	
		
})

module.exports = router;

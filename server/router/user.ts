const router = require("express").Router();
const { uuid } = require("uuidv4");
const fetch = require("node-fetch");

const { UserDB, userSchema } = require("../models/user");
const User = UserDB.model("user", userSchema);

// get user by key/value
router.get("/find/:key/:value",async (req,res)=>{
        const { key, value } = req.params;

        const _user = await User.findOne({[key]: value});
        if(!_user){return res.json({status:404,msg:"player not found",ok:true});}
        else{
                return res.json({..._user,ok:true});
        }
})

// create new user
router.post("/new",async(req,res)=>{
	const {fullName,username,email,password} = req.body;
	const userID = uuid();
	const newUser = new User({
		userID: userID,
		name: fullName,
		email: email,
		firstLogin: true,
		createdOn: Date.now(),
		country: "NaN",
		oAuth: {
			provider: "local",
			proivderID: userID,
			providerUsername: username,
			providerAvatar: "",
			providerPassword: password,
		}
	})
	.save()
	.then(async (savedUser) =>{
	console.log(savedUser);
	const playerOptions = {
		method: "POST",
		headers:{
			"Content-Type":"application/json"
		},
		body: JSON.stringify({userID: userID,username:username})
	}
	const playerResponse = await fetch("http://localhost:5000/api/player/new",playerOptions);
	const playerData = await playerResponse.json();
	console.log("Player Created - router/user.ts");
	return res.json(playerData);
	})
})
module.exports = router;

const router = require("express").Router();

router.get("/test",(req,res)=>{
	res.json({status:200, msg: "endpoint found"});
})
router.get("/test2",(req,res)=>{
	console.log("Redirect Incoming.")
	const luck = Math.round(Math.random());
	if(luck === 0){
		return res.json({ok:false})
	}
	else{
		return res.json({ok:true});
	}
})

//! Export
module.exports = router;

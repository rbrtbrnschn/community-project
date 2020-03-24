const { sendMail } = require("../services/nodemailer/nodemailerSetup");
const { isAuth } = require("../services/middleware");
const router = require("express").Router();

router.get("/test",isAuth,(req,res)=>{
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
router.get("/test3",isAuth,(req,res)=>{
	sendMail("bornirobert@aol.de","Test","<h2>Test Test Test</h2>").catch(console.log);
	return res.json({"status":200,msg:"mail sent"});
})
//! Export
module.exports = router;

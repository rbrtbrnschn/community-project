const router = require("express").Router();

router.get("/test",(req,res)=>{
	res.json({status:200, msg: "endpoint found"});
})

//! Export
module.exports = router;

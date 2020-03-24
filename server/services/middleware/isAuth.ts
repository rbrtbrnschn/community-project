module.exports = (req,res,next) => {
		if(req.user){
			next();
		}
		else{
			return res.json({status:404,msg:"Not Logged In.", ok:false});
	}
}

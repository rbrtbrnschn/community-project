module.exports = () => {
	return (req,res,next) => {
		if(req.user){
			next();
		}
		else{
			console.log("Not Logged In");
			return res.end();
		}
	
	}
}

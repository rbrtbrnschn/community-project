const jwt = require("jsonwebtoken");
const config = require("../../config");
function withAuth(req,res,next){
  const token = req.cookies.token;

  if(!token){
    return res.json({status:401,msg:"not logged in",ok:false})
  }     
  else{
    jwt.verify(token, config.jwt.secret, function(err,decoded){
      if(err)res.status(401).send("Invalid Token");
      else{
        req.userID = decoded.id;
        next()
      }
    })
  }
}

export { withAuth }; 

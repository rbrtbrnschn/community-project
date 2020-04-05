const { UserDB, userSchema } = require("../../models/user");
const User = UserDB.model("user", userSchema);
const { PlayerDB, playerSchema } = require("../../models/player");
const Player = PlayerDB.model("player", playerSchema);

async function getUser(req){
  const id = req.userID;
  if(id){
    const user = await User.findOne({userID: id});
    return {...user._doc,ok:true};
  }
  else{
    return {status:404,msg:"Not Logged In.",ok:false}
  }
}
async function getPlayer(req){
  const id = req.userID;
  if(id){
    const player = await Player.findOne({playerID: id});
    return {...player,ok:true};
  }
  else{
    return {status:404,msg:"Not Logged In.",ok:false}
  }
}
export { getUser, getPlayer };


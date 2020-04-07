import jwt from "jsonwebtoken"
import config from "../../config"

const { cookies } = config;
function signToken(payload){
const token = jwt.sign(payload,config.jwt.secret, {expiresIn: "1d"});
return token;
}

export { signToken }

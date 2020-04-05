import { getUser } from "../snippets"
async function setUser(req,res,next){
	const user = await getUser(req);
	req.user = user;
	next();
}
export { setUser }

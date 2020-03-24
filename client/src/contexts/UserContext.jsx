import React,{ useEffect} from "react";

const UserContext = React.createContext({});

const UserProvider = (props) => {

	const [state,setState] = React.useState(
		{user:{
			oAuth:{}
		},player:{
			tasks:[],
			opponents:[],
			sockets:[],
		},matches:[
			{
			scores: [],
			timestamps:[],
			},
		],
		ok:false});
	const { children } = props;
	
	useEffect( () => {
    let _user,_player,_matches;
    // Init
    init();
    async function init(){
    	_user = await getUser();
    	_player = await getPlayer(_user);
    	_matches = await getMatches(_player);
    	if(_user.ok && _player.ok){
		setState({user:_user,player:_player,matches:_matches});
	}

    }

    // Get User
    async function getUser(){
    	const response = await fetch("/api/auth");
	const data = await response.json();
	//console.log("User:",data);
	return data;
    }
    // Get Player
    async function getPlayer(user){
    	const response = await fetch("/api/player/find/playerID/"+user.userID);
	const data = await response.json();
	//console.log("Player:",data);
	return data;
    }
    // Get Matches
    async function getMatches(player){
	const errMessage =
{status:404,msg:"player not found", ok:false}
	if(!player.sockets){
		console.log("matches:",errMessage);
		return errMessage;
	}

	const options = {
		method: "POST",
		headers: {
			"Content-Type":"application/json"
		},
		body: JSON.stringify([..._player.sockets])
	}
    	const response = await fetch("/api/match",options);
	const data = await response.json();
	//console.log("Matches:",data);
	return data;
    }

  }, []);

  useEffect(()=>{
     const prior = {...state};
     if(prior.ok === false)return;
    console.log(state);
  },[state])


	return(
		<UserContext.Provider
		value={
			{state,
			setState}
		}>
			{children}
		</UserContext.Provider>)

}

export default UserContext;

export { UserProvider };
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Task from "./task";
import Stats from "./stats";
import Hero from "./hero";
import Tabs from "./tabs";
import UserContext from "../../contexts/UserContext";
import config from "../../config";
const { uri } = config;
const Profile = (props) => {
	const location = useLocation();
	const context = React.useContext(UserContext)
	const { state,setState} = context;

	const param = location.pathname.split("/").pop();
	const isParam = param !== "profile";
	const username = isParam ? "Loading..." : state.player.username;
	const [ profile,setProfile ] = useState({username:username,isSearching: isParam, tasks:[],page:1})
	
	const handleOnNewHighscore = (hs) => {
		setState({...state,player:{...state.player,highscore:hs},highscoreIsOk:true})
	}

	useEffect(()=>{
	if(profile.isSearching){
	  getPlayer(param)
	  .then(data=>{
		setProfile({...profile,...data,isOwner:false,isSearching: false})
	  });
	  }
	else if(profile.isSearching === false){
		getPlayer(param)
		.then(player=>{
	  	  setProfile({...profile,isOwner:true,...player})
		
		})
	}
	else{return;}
// eslint-disable-next-line	
	},[])
	
	const hero = {
		title: "Highest Streak:",
		sub: profile.highscore,
		color: "is-link"
	}
	const hero2 = {
		title: "Last Online On:",
		sub: new Date(Date.parse(profile.lastLogin)).toLocaleDateString(),
		color: "is-info"
	}
	const hero3 = {
		title: "Something Totaly Different",
		sub: new Date(Date.parse(profile.lastLogin)).toLocaleDateString(),
		color: "is-primary"
	}

	const heros = [hero,hero2,hero3];

	useEffect(()=>{
	  if(isParam)return;
	  setProfile({...profile,...state.player})
		// eslint-disable-next-line
	},[state.player])

	async function getPlayer(username){
	  const response = await fetch(uri.domain+"/api/player/find/username/"+username);
		const data = await response.json();
		return data;
	}

	const handleOnClickTab = e => {
                try{
                const lis = document.querySelectorAll("li.is-active");
                lis.forEach(l=>l.classList.remove("is-active"));

                const button = e.target.classList[0]
                const li = document.querySelector(`li#${button}`);
                li.classList.add("is-active");
                }
                catch(err){}
        }

	const goLeft = e => {
		handleOnClickTab(e);
		const page = 0;
		setProfile({...profile,page:page});
	}

	const goMiddle = e => {
		handleOnClickTab(e);
		const page = 1;
		setProfile({...profile,page:page});
	}

	const goRight = e => {
		handleOnClickTab(e);
		const page = 2;
		setProfile({...profile,page:page});
	}
	const { tasks } = profile;
	return (
		<div>
		<Tabs profile={profile} navHelpers={{left:goLeft,middle:goMiddle,right:goRight}}/>
		{profile.page === 0 ?
			tasks.map(t=>(<Task key={t.id} task={t} profile={profile}/>))
			: profile.page === 1 ?
			<Stats onNewHighscore={handleOnNewHighscore} profile={profile}/>
				: profile.page === 2 ?
				heros.map(h=>(<Hero key={h.title} hero={h} />))
				: <div></div>

		}
		</div>
	);
}

export default Profile;
export { Profile };

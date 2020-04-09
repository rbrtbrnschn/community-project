import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Task from "./task";
import Stats from "./stats";
import Hero from "./hero";
import Crumbs from "./crumbs";
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
	useEffect(()=>{
	if(profile.isSearching){
	  getPlayer(param)
	  .then(data=>{
		setProfile({...profile,...data,isSearching: false})
	  });
	  }
	else if(profile.isSearching === false){
		getPlayer(param)
		.then(player=>{
	  	  setProfile({...profile,...player})
		
		})
	}
	else{return;}
	
	},[])
	
	const hero = {
		title: "Last Online On",
		sub: new Date(Date.parse(profile.lastLogin)).toLocaleDateString(),
		color: "is-link"
	}
	const hero2 = {
		title: "Something Else On",
		sub: new Date(Date.parse(profile.lastLogin)).toLocaleDateString(),
		color: "is-info"
	}
	const hero3 = {
		title: "Something Totaly Different",
		sub: new Date(Date.parse(profile.lastLogin)).toLocaleDateString(),
		color: "is-primary"
	}

	useEffect(()=>{
	  if(isParam)return;
	  setProfile({...profile,...state.player})
	},[state.player])

	async function getPlayer(username){
	  const response = await fetch(uri.domain+"/api/player/find/username/"+username);
		const data = await response.json();
		return data;
	}

	const goLeft = () => {
		const currentPage = profile.page;
		const newPage = currentPage - 1;
		if(newPage < 0)return;
		setProfile({...profile,page:newPage});
	}

	const goRight = () => {
		const currentPage = profile.page;
		const newPage = currentPage + 1;
		if(newPage > 2)return;
		setProfile({...profile,page:newPage});
	}
	const { tasks } = profile;
	return (
		<div>
		<Tabs profile={profile} navHelpers={{left:goLeft,right:goRight}}/>
		{profile.page === 0 ?
			tasks.map(t=>(<Task key={t.id} task={t}/>))
			: profile.page === 1 ?
			<Stats profile={profile}/>
				: profile.page === 2 ?
				<div>
					<Hero hero={hero} />
					<Hero hero={hero2} />
					<Hero hero={hero3} />
				</div>
				: <div></div>

		}
		</div>
	);
}

export default Profile;
export { Profile };

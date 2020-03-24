import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import "../css/pages/homepage.css";

function Info(props){
	const context = useContext(UserContext);
	const {state, setState} = context;
	const handleOnClick = () =>{
		setState({status:404,msg:"testing"});
	}

	return( <div className="info-tab">
		<h2>Info Tab</h2>
		<div>Name: {state.user.name}</div>
		<div>Email: {state.user.email}</div>
		<div>Auth-Type: {state.user.oAuth.provider}</div>
		<div></div>
		</div>);
}
export default Info;

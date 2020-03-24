import React, { useEffect } from "react";
import socketIOClient from "socket.io-client";
import UserContext from "../contexts/UserContext";

const SocketIO = () => {
	const socket = socketIOClient();
	const context = React.useContext(UserContext);
	const {state,setState} = context;
	useEffect(()=>{
		console.log("socketiosetup:",state);
	},[state])

	return(<div></div>)
}

export default SocketIO;

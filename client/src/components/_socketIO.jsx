import React, { useEffect } from "react";
import socketIOClient from "socket.io-client";
import UserContext from "../contexts/UserContext";

const SocketIO = ({children}) => {
	const socket = socketIOClient("/todo-hub");
	const context = React.useContext(UserContext);
	const {state,setState} = context;
	useEffect(()=>{
		console.log("Websocket Connected.");
	},[])

	return(<div>{children}</div>)
}

export default SocketIO;

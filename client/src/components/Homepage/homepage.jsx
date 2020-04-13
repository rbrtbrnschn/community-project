import React, { useEffect } from "react";
//import SocketIOClient from "socket.io-client";
import UserContext from "../../contexts/UserContext";
const Home = (props) => {

	const context = React.useContext(UserContext);
	const { state } = context;
	//const socket = SocketIOClient("http://localhost:5000");
	//const socketIDS = state.player.sockets;
	useEffect(()=>{
		//socket.emit("onConnection","test")
	})
	useEffect(()=>{
		//socket.emit("onConnection",socketIDS);
			
		/*
		socket.on("onSendToRoom",(data)=>{
			console.log("Data Arrived:",data);
		})
		if(socketIDS.length === 0)return;
		socket.emit("onSendToRoom",{socketID:socketIDS[0],data:"Hello"})
		// eslint-disable-next-line react-hooks/exhaustive-deps
		*/
	},[state.matches])
	
   	return (
      	<div>

      	</div>
    	);
}

export default Home;

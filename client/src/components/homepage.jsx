import React, { useEffect } from "react";
import SocketIOClient from "socket.io-client";
import UserContext from "../contexts/UserContext";
const Home = (props) => {

	const context = React.useContext(UserContext);
	const { state,setState } = context;
	const socket = SocketIOClient("/todo-hub");
	const socketIDS = state.player.sockets;
	
	const handleOnClick = (socketID) =>{
		const room = socketID + "";
		socket.emit("onSendToRoom",{socketID:room,data:"Have I Arrived?"});
	}
	
	useEffect(()=>{
		socket.on("onConnection",data =>{
			if(socketIDS.length === 0)return;
			socket.emit("onJoinRooms",socketIDS);
			
		})

		socket.on("onSendToRoom",(data)=>{
			console.log("Data Arrived:",data);
		})
	},[state])
	
   	return (
      	<div>
        <h4> Home </h4>
        <a href="/api/auth/discord/login">Login with discord</a>
        <p></p>
        <a href="/api/auth/google/login">Login with google</a>
        <p></p>
	<a href="/login">Login</a>
	<p></p>
        <a href="/api/auth/logout">Logout</a>
        <button onClick={()=>handleOnClick(7579)}>Send Data</button> 

      	</div>
    	);
}

export default Home;

import React, { useEffect } from "react";
import SocketIOClient from "socket.io-client";
import UserContext from "../../contexts/UserContext";
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

      	</div>
    	);
}

export default Home;

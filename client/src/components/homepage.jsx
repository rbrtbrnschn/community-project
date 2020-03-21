import React, { Component } from "react";
import socketIOClient from "socket.io-client"

class homepage extends Component {
  state = {};
  socket = socketIOClient("http://localhost:3000");
  componentDidMount() {
    console.log("mounted");
  }
  render() {
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
        

      </div>
    );
  }
}

export default homepage;

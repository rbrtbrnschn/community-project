import React, { Component } from "react";
class homepage extends Component {
  state = {};
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

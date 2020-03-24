import React, { Component } from "react";

class homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("context pls:",this.props);
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

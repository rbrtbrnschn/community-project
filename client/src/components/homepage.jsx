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
      </div>
    );
  }
}

export default homepage;

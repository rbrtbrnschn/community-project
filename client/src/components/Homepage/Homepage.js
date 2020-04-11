import React, { Component } from "react";
import Home from "./homepage";
import Info from "./info";
import Friends from "./friends";
class Homepage extends Component {
  state = {};
  render() {
    return (
	    <div>
	    <Home />
	    <Info />
  	    </div>
    )}
}

export default Homepage;

import React, { Component } from "react";
import Home from "./_homepage";
import Info from "./info";
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

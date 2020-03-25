import React, { Component } from "react";
import Home from "../components/homepage";
import Info from "../components/homepageInfo";
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

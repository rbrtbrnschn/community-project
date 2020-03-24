import React, { Component } from "react";
import HomepageComponent from "../components/homepage";
import Info from "../components/homepageInfo"
class Homepage extends Component {
  state = {};
  render() {
    return (
	    <div>
	    <HomepageComponent />
	    <Info />
  	    </div>
    )}
}

export default Homepage;

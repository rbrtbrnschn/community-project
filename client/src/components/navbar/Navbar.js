import React from "react";
import {BasicNavItem, DropdownNavItem} from "./item"
import Hamburger from "./hamburger"
import "../../css/navbar/navbar.css";
import { config } from "../../config";
const { uri } = config;
const Navbar = (props) => {
	/**
	 * @BasicNavItem takes in: title,link
	 * @param {title} Name Of The Link
	 * @param {link} Href When Clicked On
	 *
	 * @DropdownNavItem takes in: title, pos, children
	 * @param {title} Name Of The Dropdown Menu
	 * @param {pos} Number [1,2,3], x>3 || x<1 wont work on mobile
	 *@param {childrne} Array Of @BasicNavItem s
	 */
	const homepage = {
		title:"TodoHub",
		link:"/"
	}
	const tasks = {
		title:"Tasks",
		link:"/tasks"
	}
	const profile = {
		title:"Profile",
		link:"/profile"
	}
	const account = {
		title: "Account",
		pos:1,
		children:[
			{title: "Profile",link:"/profile"},
			{title: "Login",link:"/login"},
			{title: "Register",link:"/createAccount"},
			{title: "Logout",link:`${uri.domain}/api/auth/logout`},
		]
	}

	return(
	<nav className="navbar has-shadow is-spaced is-fixed-top" role="navigation" aria-label="main navigation">
		<div className="container">
		<input type="checkbox" id="toggler" className="toggler" />
		<div className="navbar-brand">
			<a className="navbar-item" style={{fontFamily:"aliseo"}} href="/">TodoHub</a>
			<Hamburger />
		</div>
		<div id="navbarBasicExample" className="navbar-menu">
			<div className="navbar-start">
			<BasicNavItem item={tasks} />
			<BasicNavItem item={profile} />
			</div>
			<div className="navbar-end">
			  
			  <DropdownNavItem item={account} />	
			
			</div>
		</div>
	</div>
	</nav>
	);
}

export default Navbar;

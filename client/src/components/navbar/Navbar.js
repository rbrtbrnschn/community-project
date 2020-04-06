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
		title:"Home",
		link:"/"
	}
	const tasks = {
		title:"Tasks",
		link:"/tasks"
	}
	const test = {
		title:"Test",
		link:"/test"
	}
	const account = {
		title: "Account",
		pos:1,
		children:[
			{title: "Login",link:"/login"},
			{title: "Register",link:"/createAccount"},
			{title: "Logout",link:`${uri.domain}/api/auth/logout`},
		]
	}

	return(
	<nav className="navbar is-danger is-fixed-top" role="navigation" aria-label="main navigation">
		<input type="checkbox" id="toggler" className="toggler" />
		<div className="navbar-brand">
			<BasicNavItem item={homepage} />
			<Hamburger />
		</div>
		<div id="navbarBasicExample" className="navbar-menu">
			<div className="navbar-start">
			<BasicNavItem item={tasks} />
			<BasicNavItem item={test} />
			</div>
			<div className="navbar-end">
			  
			  <DropdownNavItem item={account} />	
			
			</div>
		</div>
	</nav>
	);
}

export default Navbar;

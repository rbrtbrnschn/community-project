import React from "react";
import "./fab.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Fab = (props) => {

	return(
	<a className="fab" style={{position:"fixed",backgroundColor:"#3273dc"}} onClick={()=>{
	//window.location = "/createTask";
	const modal = document.getElementById("create-modal");
	modal.classList.add("is-active");
	const html = document.querySelector("html");
	html.classList.add("is-clipped");
	}}>
	<FontAwesomeIcon icon="plus"/>
		</a>
	)
}

export default Fab;
export {Fab}

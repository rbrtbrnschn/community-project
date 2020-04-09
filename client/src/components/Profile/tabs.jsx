import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft,faAngleDown,faAngleRight } from "@fortawesome/free-solid-svg-icons";
const Tabs =(props) => {
	const { left, right} = props.navHelpers;

	return(
		<div className="tabs is-fullwidth">
		  <ul>
		    <li onClick={left}>
		      <a>
		        <span className="icon">
		<FontAwesomeIcon icon={faAngleLeft} aria-hidden="true" />
		</span>
		        <span>Left</span>
		      </a>
		    </li>
		    <li>
		      <a>
		        <span className="icon">
		<FontAwesomeIcon icon={faAngleDown} aria-hidden="true"/>
		</span>
		        <span>Down</span>
		      </a>
		    </li>
		    <li onClick={right}>
		      <a>
		        <span>Right</span>
		        <span className="icon">
		<FontAwesomeIcon icon={faAngleRight} aria-hidden="true"/>
		</span>
		      </a>
		    </li>
		  </ul>
		</div>
	);
}
export default Tabs;


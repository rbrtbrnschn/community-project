import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft,faAngleDown,faAngleRight } from "@fortawesome/free-solid-svg-icons";
const Tabs =(props) => {
	const { left, middle, right} = props.navHelpers;
	return(
		<div className="tabs is-boxed is-fullwidth is-medium">
		  <ul>
		    <li id="tab-1" onClick={left}>
		      <a className="tab-1">
		        <span className="tab-1 icon">
		<FontAwesomeIcon icon={faAngleLeft} aria-hidden="true" className="tab-1"/>
		</span>
		        <span className="tab-1">Todos</span>
		      </a>
		    </li>
		    <li id="tab-2" className="is-active" onClick={middle}>
		      <a className="tab-2">
		        <span className="tab-2 icon">
		<FontAwesomeIcon icon={faAngleDown} aria-hidden="true" className="tab-2"/>
		</span>
		        <span className="tab-2">Stats</span>
		      </a>
		    </li>
		    <li id="tab-3"onClick={right}>
		      <a className="tab-3">
		        <span className="tab-3">History</span>
		        <span className="tab-3 icon">
		<FontAwesomeIcon icon={faAngleRight} aria-hidden="true" className="tab-3"/>
		</span>
		      </a>
		    </li>
		  </ul>
		</div>
	);
}
export default Tabs;


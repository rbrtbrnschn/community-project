import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft,faAngleUp,faAngleRight } from "@fortawesome/free-solid-svg-icons";

const isMobile = window.innerWidth <= 700;
const Tabs =(props) => {
	const { left, middle, right} = props.navHelpers;
	const base = "tabs is-boxed is-fullwidth is-medium"
	return(
		<nav className={isMobile ? base+" navbar is-fixed-bottom is-marginless" : base} >
		  <ul>
		    <li id="tab-1" onClick={left}>
		      <a href="#tab-1" className="tab-1">
		        <span className="tab-1 icon">
		<FontAwesomeIcon icon={faAngleLeft} aria-hidden="true" className="tab-1"/>
		</span>
		        <span className="tab-1">Todos</span>
		      </a>
		    </li>
		    <li id="tab-2" className="is-active" onClick={middle}>
		      <a href="#tab-2" className="tab-2">
		        <span className="tab-2 icon">
		<FontAwesomeIcon icon={faAngleUp} aria-hidden="true" className="tab-2"/>
		</span>
		        <span className="tab-2">Stats</span>
		      </a>
		    </li>
		    <li id="tab-3"onClick={right}>
		      <a href="#tab-3" className="tab-3">
		        <span className="tab-3">History</span>
		        <span className="tab-3 icon">
		<FontAwesomeIcon icon={faAngleRight} aria-hidden="true" className="tab-3"/>
		</span>
		      </a>
		    </li>
		  </ul>
		</nav>
	);
}
export default Tabs;


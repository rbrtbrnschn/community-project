import React from "react";
import {useLocation} from "react-router-dom";

const Crumbs = (props) => {
	const {profile} = props;
	const location = useLocation();
	const pathname = location.pathname.split("/")
	pathname.splice(0,1);
	const [path,setPath] = React.useState(pathname);
	const isLast = (name) => {
		return path[path.length - 1] === name ? "is-active" : "";
	}
	console.log(path)

	return(
	<nav className="breadcrumb is-right is-spaced" aria-label="breadcrumbs">
		  <ul>
		    {path.map(p=>(
		    	<li className={isLast(p)}><a href={path.join("/")}>{p}</a></li>
		    ))}
		  </ul>
		</nav>
	)
}

export default Crumbs;

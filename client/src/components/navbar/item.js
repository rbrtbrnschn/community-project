import React from "react";

const BasicNavItem = (props) =>{
	const { item } = props;
	const { title, link } = item;
	const classes = "navbar-item";
	return(
		<a className={classes} href={link || "#"}>{title}</a>
	);
}


const DropdownNavItem = (props) => {
	const { item } = props;
	const { title,pos,children } = item;
	const classes = "navbar-item has-dropdown is-hoverable";
	
	return(
		<div className={classes}>
			<input type="checkbox" id={"dropdown"+pos} />
			<label htmlFor={"dropdown"+pos} className="navbar-link">
				{title}
			</label>
			<div id={"dropdown-content"+pos} className="navbar-dropdown">
				{children.map((c,i)=>(<BasicNavItem key={c.title} item={c} />))}
			</div>
			

		</div>
	);
}

export default BasicNavItem;
export { BasicNavItem, DropdownNavItem };

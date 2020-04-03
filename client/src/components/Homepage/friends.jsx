import React from "react";
import UserContext from "../../contexts/UserContext"
const Friends = (props) => {
	const context = React.useContext(UserContext);
	const {state} = context;
	const { opponents } = state;
	const getRandomColor = () => {
	const colors = ["is-black","is-dark","is-light","is-white","is-primary","is-link","is-info","is-success","is-danger","is-warning"]
		const random = Math.round(Math.random(0,9)*10);
		const tag = "tag "
		const returnTag = tag + colors[random]
		return returnTag
	}
	return(
		<div>
		<span className="subtitle">FRIENDS</span>
		{opponents.map(o=>(
			<div key={o.playerID}>
		<span className={getRandomColor()}>{o.username}</span>
			</div>
		))}
	</div>)
}
export default Friends;
export { Friends }

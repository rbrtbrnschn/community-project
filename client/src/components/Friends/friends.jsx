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
                const returnTag = colors[random]
                return returnTag
        }

        return(
                <div>
                {opponents.map(o=>(
			<section key={o.playerID}
			className={"hero is-bold "+getRandomColor()}
			onClick={()=>{
			window.location = "/profile/"+o.username
			}}
			>
			<div className="hero-body">
				<div className="container">
				<p className="title">{o.username}</p>
			<p className="subtitle">{new Date(o.lastLogin).toLocaleDateString()}</p>
			</div>

			</div>
                        </section>
                ))}
        </div>)

}

export default Friends;

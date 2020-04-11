import React from "react";
import UserContext from "../../contexts/UserContext";
import AddFriend from "./add";
import "./friends.scss"
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
	const getColor =(i) => {
		const colors = ["is-info","is-secondary"]
		const isOdd = i % 2 !== 0;
		if(isOdd)return colors[1]
		if(!isOdd)return colors[0]

	}
	const handleOnClickProfile = username => {
		window.location = "/profile/"+username;
	}
	const handleOnClickBody = username => {
		handleOnClickProfile(username);
	}

        return(
                <div>
                {opponents.map((o,i)=>(
			<section 
			key={o.playerID}
			className={"hero is-medium pointer "+ getColor(i)}>

  <div className="hero-head">
    <nav className="navbar">
      <div className="container">
      </div>
    </nav>
  </div>

			
  <div className="hero-body" onClick={()=>handleOnClickBody(o.username)}>
    <div className="container has-text-centered">
      <h1 className="title">
			{o.username}
      </h1>
      <h2 className="subtitle">
			Last Login: {new Date(o.lastLogin).toLocaleDateString()}
      </h2>
    </div>
  </div>


  <div className="hero-foot">
    <nav className="tabs">
      <div className="container">
        <ul>
          <li className="is-active"><a onClick={()=>{handleOnClickProfile(o.username)}}>Profile</a></li>
          <li><a>Achievements</a></li>
          <li><a>Challenge</a></li>
          <li><a>Remove</a></li>
        </ul>
      </div>
    </nav>
  </div>
</section>
                ))}
		<AddFriend />
        </div>)

}

export default Friends;

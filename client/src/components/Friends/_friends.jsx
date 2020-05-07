import React from "react";
import UserContext from "../../contexts/UserContext";
import AddFriend from "./add";
import "./friends.scss"
const Friends = (props) => {
	const context = React.useContext(UserContext);
        const {state} = context;
        const { opponents } = state;
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
	const handleOnClickChallenge = opponent =>{
		/*const o = {...opponent};
		let stamps = []
		
		o.tasks.forEach((t,i)=>{
		const max = t.timestamps.length;
		if(max < 3){
			stamps.push([])
			t.timestamps.forEach(s=>s.payload === "onFail" ? count);
			return;
		}
		else{
			stamps.push([])
			t.timestamps.splice(0,[t.timestamps.length-3]);	
			
			stamps[i].push(t.timestamps);
			
			}
		})
		console.log(stamps)*/
			//TODO
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
          <li className="is-active"><a href="#user" onClick={()=>{handleOnClickProfile(o.username)}}>Profile</a></li>
          <li><a href="#achievements">Achievements</a></li>
          <li><a href="#challenge" onClick={
	  ()=>{handleOnClickChallenge(o);
	  }
	  }>Challenge</a></li>
          <li><a href="#remove">Remove</a></li>
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

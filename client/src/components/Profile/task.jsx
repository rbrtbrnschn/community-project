import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../contexts/UserContext"

const Task = (props) => {
	const context = React.useContext(UserContext);
	const { state, setState } = context;
	const { task, profile } = props;
	
	const addTask = task => {
		let tasks = [...state.player.tasks]
		let _task = {...task};
		_task.streak = 0;
		_task.stikes = 0;
		_task.notes = task.notes + " | @"+profile.username
		tasks.push(_task)
		setState({...state,player:{...state.player,tasks:tasks},ok:true})
	}

	const lastCompleted = (task) => {
	  const { timestamps } = task;
	  let newest = 0;
	  timestamps.forEach(t=>{
	  if(t.key > newest && t.payload === "onComplete"){
		  newest = t.key;
	  }
	  })
	  if(newest === 0)return "Incomplete.";
	  const latestDate = new Date(newest);
	  return latestDate.toLocaleDateString();
	}

	const handleOnJoin = (task) => {
		const exists = state.player.tasks.find(t=>t.id === task.id) ? true : false
		if(exists){
			console.log("exists")
			throw new Error("TaskIdExists");
			return;
		}
		console.log("added")
		addTask(task);
		window.location = "/tasks"
	}
	const isChallenge = task.payload === "Challenge";
	return (<div className="container is-fullwidth">
                <div className="card" id={task.id}>
                <div className="card-content">     
                <p className="title is-3">{task.title}</p>
                <p className="subtitle">{task.notes}</p>
                </div>

                <footer className="card-footer">
                <p className="card-footer-item">
                <button className="button is-link"
                        
                >
                <span className="icon is-small">
                 <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span>{new Date(task.timestamps[0].key).toLocaleDateString()}</span>
                 </button>
                </p>
                <p className="card-footer-item">
		<button className="button is-info">  
		<span className="icon is-small">
		<FontAwesomeIcon icon={faCheckDouble} />
		</span>
		<span>{lastCompleted(task)} </span>
		  </button>
                </p>
		{isChallenge ?
                <p className="card-footer-item">
		<button className="button is-primary" onClick={()=>{handleOnJoin(task)}}>  
		<span className="icon is-small">
		<FontAwesomeIcon icon="copy" />
		</span>
		<span>Join</span>
		  </button>
                </p> : 
			<p className="card-footer-item">
			<button className="button is-primary" onClick={()=>{handleOnJoin(task)}}>
			<span className="icon is-small">
			<FontAwesomeIcon icon="copy" />
			</span>
			<span>Copy</span>
			</button></p>
		}
                </footer>
                </div>

        </div>)

}

export default Task;

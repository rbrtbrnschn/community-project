import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckDouble, faShieldAlt, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../contexts/UserContext"
import OptionsDropdown from "./optionsDropdown";
import StatsModal from "./statsModal";

const Task = (props) => {
	const context = React.useContext(UserContext);
	const { state, setState } = context;
	const { task, profile } = props;
	const { isOwner } = profile;

	const addTask = task => {
		let tasks = [...state.player.tasks]
		let _task = {...task};
		_task.isComplete = false;
		_task.timestamps = [{key:Date.now(),payload:"onCreate",isComplete:false}]
		_task.createdAt = new Date();
		if(_task.payload !== "Task"){
		_task.streak = 0;
		_task.strikes = 0;
		}
		_task.notes = task.notes + " | @"+profile.username
		console.log(_task);
		tasks.push(_task)
		setState({...state,player:{...state.player,tasks:tasks},ok:true})
	}
	const handleCopy = task => {
		addTask(task);
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
		}
		console.log("added")
		addTask(task);
	}
	const isChallenge = task.payload === "Challenge";

	const handleOnStreakColor = (task) => {
        	const s = task.streak;
        	let color = "is-info";
        	if(s<0)color = "is-link"
        	else if(s === 0){}
        	else if(s >= 5)color = "is-primary"
        	return color;
  };
	const handleOnOptions = (task) => {
		const options = document.getElementById("options-modal");
		options.classList.add("is-active")
	}

	const handleOnStats = () => {
		handleOnOptions(task);
	}
	return (<div className="container is-fullwidth">
                <div className="card" id={task.id}>
		{!isOwner && <OptionsDropdown task={task} />}
                <div className="card-content">     
                <p className="title is-3">{task.title}</p>
                <p className="subtitle">{task.notes}</p>
		{task.streak !== undefined ? <p className={"tag is-rounded is-large "+handleOnStreakColor(task)}>{task.streak}</p> : ""}
                </div>

                <footer className="card-footer">
                <p className="card-footer-item">
                <button className="button is-link"
                        
                >
                <span className="icon is-small">
                 <FontAwesomeIcon icon={faCheckDouble} />
                    </span>
                    <span>{lastCompleted(task)}</span>
                 </button>
                </p>
		{isOwner && <p className="card-footer-item">
                	<button className="button is-link"
			onClick={handleOnStats}
			>
                	<span className="icon is-small">
                	<FontAwesomeIcon icon={faShieldAlt} />
                	</span>
             	 	<span>View Stats</span>
                 	</button>
				
		</p>}
		{!isOwner && isChallenge ?
                <p className="card-footer-item">
		<button className="button is-primary" onClick={()=>{handleOnJoin(task)}}>  
		<span className="icon is-small">
		<FontAwesomeIcon icon="copy" />
		</span>
		<span>Join</span>
		  </button>
                </p> : !isOwner && !isChallenge ?
			<p className="card-footer-item">
			<button className="button is-primary" onClick={()=>{handleCopy(task)}}>
			<span className="icon is-small">
			<FontAwesomeIcon icon="copy" />
			</span>
			<span>Copy</span>
			</button></p> : ""
		}
                </footer>
                </div>
		<StatsModal task={task} />

        </div>)

}

export default Task;

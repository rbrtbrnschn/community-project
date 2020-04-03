import React, { useEffect } from "react";
import {Modal} from "./modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes,faCheck} from "@fortawesome/free-solid-svg-icons"
const Streak = (props) => {
	const { all } = props;
	const { task, onDelete, onComplete, onEdit, onCancle, onSaveChanges, onArchive, onNewDay, isNewDay } = all;

	useEffect(()=>{
		//const isNew = isNewDay();
		//if(isNew){
		//onNewDay(task);
		//}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	return(<div className="task">
		<div className="card" id={task.id}>
		<div className="card-content" onClick={onEdit}>		
		<p className="title is-3">{task.title}</p>
		<p className="subtitle">{task.notes}</p>
		<p className="subtitle">{task.streak}</p>
		</div>

		<footer className="card-footer">
		<p className="card-footer-item">
		<button className="button is-success"
			onClick={onComplete}
		>
    		<span className="icon is-small">
     		 <FontAwesomeIcon icon={faCheck} />
		    </span>
		    <span>Complete</span>
	 	 </button>
		</p>
		<p className="card-footer-item">
		<button className="button is-danger is-outlined"
			onClick={onDelete}
		>
  		  <span>Delete</span>
  		  <span className="icon is-small">
  		    <FontAwesomeIcon icon={faTimes} />
  		  </span>
  		</button>
		</p>
		</footer>
		</div>
		<Modal task={task} onCancle={onCancle} onSaveChanges={onSaveChanges} onArchive={onArchive} />
		
	</div>)
}

export default Streak;

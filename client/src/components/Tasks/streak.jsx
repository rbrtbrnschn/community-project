import React from "react";
import {Modal} from "./modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes,faCheck} from "@fortawesome/free-solid-svg-icons"
const Streak = (props) => {
	const { all } = props;
	const { task, onDelete, onComplete, onEdit, onCancle, onSaveChanges, onArchive, onFail } = all;

	return(<div className="task">
		<div className="card" id={task.id}>
		<div className="card-content" onClick={onEdit}>		
		<p className="title is-3">{task.title}</p>
		<p className="subtitle">{task.notes}</p>
		<p className="tag is-link is-primary is-rounded is-large">{task.streak}</p>

		</div>

		<footer className="card-footer">
		<p className="card-footer-item">
		<button className="button is-link is-outlined"
			onClick={onComplete}
		>
    		<span className="icon is-small">
     		 <FontAwesomeIcon icon={faCheck} />
		    </span>
		    <span>Complete</span>
	 	 </button>
		</p>
		<p className="card-footer-item">
		<button className="button is-info is-outlined"
			onClick={onFail}
		>
  		  <span> Fail </span>
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

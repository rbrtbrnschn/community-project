import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const Task = (props) => {
	const { task, onDelete, onComplete } = props;

	return(<div className="card" id={task.id}>
		<div className="card-content">		
		<p className="title is-3">{task.title}</p>
		<p className="subtitle">{task.notes}</p>
		</div>

		<footer className="card-footer">
		<p className="card-footer-item">
		<span onClick={onComplete}>Complete</span>
		</p>
		<p className="card-footer-item">
		<span onClick={onDelete}>Delete</span>
		</p>
		</footer>
		</div>)
}

export default Task;

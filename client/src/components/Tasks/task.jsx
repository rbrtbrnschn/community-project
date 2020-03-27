import React from "react";

const Task = (props) => {
	const { task } = props;
	return(<div className="box">
		<p className="title is-3">{task.title}</p>
		<p className="subtitle">{task.notes}</p>
		</div>)
}

export default Task;

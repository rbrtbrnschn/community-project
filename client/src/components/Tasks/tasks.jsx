import React from "react";
import Task from "./task"
import UserContext from "../../contexts/UserContext";
const Tasks = (props) => {
	const context = React.useContext(UserContext);
	const { state,setState } = context;
	const { player } = state;
	const { tasks } = player;
	return(<div>
		Tasks
		{tasks.map(t=><Task task={t} />)}
		</div>)
}

export default Tasks;

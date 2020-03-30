import React from "react";
import Task from "./task"
import UserContext from "../../contexts/UserContext";
const Tasks = (props) => {
	const context = React.useContext(UserContext);
	const { state,setState } = context;
	const { player } = state;
	const { tasks } = player;
	
	/*const [_tasks,setTasks] = useState([]);
	useEffect(()=>{
		console.log("mounted");
		setTasks(tasks)
	},[tasks])*/


	const handleOnComplete = async (_id) => {
		const url = "http://localhost:3000/api/task/find/"+_id+"/complete";
		const response = await fetch(url);
		const data = await response.json();
		console.log("found:",data);
		const {task} = data;
		const i = tasks.findIndex(t => t.id === task.id);
		const _tasks = [...tasks];
		_tasks.splice(i,1);
		const _state = {...state};
		setState({...state,player:{...state.player,tasks:_tasks}});
		
	}	
	const handleOnDelete = async (_id) => {
		const url = "http://localhost:3000/api/task/find/"+_id+"/delete"
		const response = await fetch(url);
		const data = await response.json();
		console.log("found:",data);
		const {task} = data;
		const i = tasks.findIndex(t => t.id === task.id);
		const _tasks = [...tasks];
		_tasks.splice(i,1);
		const _state = {...state};
		setState({...state,player:{...state.player,tasks:_tasks}});
	
	
	}

	return(<div>
		<h1 className="title is-3"></h1>
		{tasks.map(t=><Task key={t.id} task={t} onComplete={()=>{handleOnComplete(t.id)}} onDelete={()=>{handleOnDelete(t.id)}} />)}
		</div>)
}

export default Tasks;

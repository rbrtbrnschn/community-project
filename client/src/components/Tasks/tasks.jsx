import React from "react";
import Task from "./task"
import UserContext from "../../contexts/UserContext";
const Tasks = (props) => {
	const context = React.useContext(UserContext);
	const { state,setState } = context;
	const { player } = state;
	const { tasks } = player;
	
	const handleOnComplete = async (_id) => {
		const url = "http://localhost:3000/api/task/find/"+_id+"/complete";
		const response = await fetch(url);
		const data = await response.json();
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
		const {task} = data;
		const i = tasks.findIndex(t => t.id === task.id);
		const _tasks = [...tasks];
		_tasks.splice(i,1);
		const _state = {...state};
		setState({...state,player:{...state.player,tasks:_tasks}});
	
	
	}

	const handleOnArchive = async (_id) => {
		const url = "http://localhost:3000/api/task/find/"+_id+"/archive"
		const response = await fetch(url);
		const data = await response.json();
		const { task } = data;
		const i = tasks.findIndex(t => t.id === task.id);
		const _tasks = [...tasks];
		_tasks.splice(i,1);
		const _state = {...state};
		setState({...state,player:{...state.player,tasks:_tasks}});
	}
	const handleOnEdit = (_id) => {
		const modal = document.getElementById(_id+"-modal");
		const html = document.querySelector("html");
		html.classList.add("is-clipped")
		modal.classList.add("is-active");
		
	}

	const handleOnCancle = (_id) => {
		const modal = document.getElementById(_id+"-modal");
		const html = document.querySelector("html");
		html.classList.remove("is-clipped")
		modal.classList.remove("is-active");
	}
	const handleOnSaveChanges = async(task) => {
		const { id } = task;
		const oldState = {...state};
		const oldPlayer = {...oldState.player}
		const newTasks = [...oldPlayer.tasks]
		const index = newTasks.findIndex(t=> t.id === id);
		newTasks[index] = task;

		const url = "http://localhost:3000/api/task/edit";
		const options = {
			method: "POST",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify({task:{...newTasks[index]},index:index})
		}
		const response = await fetch(url,options);
		const data = await response.json();

		setState({
			...oldState,
			player:{
				...oldPlayer,
				tasks:[...newTasks]
				}
		})

		handleOnCancle(id);
	}
	return(<div>
		<h1 className="title is-3"></h1>
		{tasks.map(t=><Task key={t.id} 
			task={t} 
			onComplete={()=>{handleOnComplete(t.id)}} 
			onDelete={()=>{handleOnDelete(t.id)}} 
			onEdit={()=>{handleOnEdit(t.id)}}
			onCancle={()=>{handleOnCancle(t.id)}}
			onSaveChanges={handleOnSaveChanges}
			onArchive={handleOnArchive}
			/>)}
		</div>)
}

export default Tasks;

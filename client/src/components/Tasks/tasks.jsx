import React from "react";
import TaskComponent from "./task";
import StreakComponent from "./streak";

import { Task, Habit, Daily, Streak, Goal, Dream, Challenge } from "./classes";
import UserContext from "../../contexts/UserContext";

const Tasks = props => {
  const context = React.useContext(UserContext);
  const { state, setState } = context;
  const { player } = state;
  const { tasks } = player;

  //! State Helpers
  const setTasks = newTasks => {
    const _state = {
      ...state,
      player: { ...state.player, tasks: newTasks },
      ok: true
    };
    setState(_state);
  };

  const setTask = task => {
    let _tasks = [...tasks];
    const { id } = task;
    const index = _tasks.findIndex(t => t.id === id);
    _tasks[index] = task;
    setTasks(_tasks);
  };

  const addTask = task => {
    const _tasks = [...tasks];
    _tasks.push(task);
    setTasks(_tasks);
  };

  const deleteTask = task => {
    const _tasks = [...tasks];
    const { id } = task;
    const index = _tasks.findIndex(t => t.id === id);
    _tasks.splice(index, 1);
    setTasks(_tasks);
  };

  const stateHelpers = {
    deleteTask,
    addTask,
    setTask,
    setTasks
  };

  function switchForPayload(task) {
    const { payload } = task;
    let _task;
    switch (payload) {
      case "Task":
        _task = new Task();
        break;
      case "Daily":
        _task = new Daily();
        break;
      case "Habit":
        _task = new Habit();
        break;
      case "Streak":
        _task = new Streak();
        break;
      case "Goal":
        _task = new Goal();
        break;
      case "Dream":
        _task = new Dream();
        break;
      case "Challenge":
        _task = new Challenge();
        break;

      default:
        break;
    }
    return _task;
  }
  //! Task Helpers
  const handleOnComplete = async _id => {
    const task = tasks.find(t => t.id === _id);
    switchForPayload(task)._complete(task, stateHelpers);
  };

  const handleOnDelete = async _id => {
    const task = tasks.find(t => t.id === _id);
    deleteTask(task);
  };

  const handleOnArchive = async _id => {
    const task = tasks.find(t => t.id === _id);
    switchForPayload(task)._archive(task, stateHelpers);
    handleOnCancle(_id);
  };

  const handleOnEdit = _id => {
    const modal = document.getElementById(_id + "-modal");
    const html = document.querySelector("html");
    html.classList.add("is-clipped");
    modal.classList.add("is-active");
  };

  const handleOnCancle = _id => {
    const modal = document.getElementById(_id + "-modal");
    const html = document.querySelector("html");
    html.classList.remove("is-clipped");
    modal.classList.remove("is-active");
  };
  const handleOnSaveChanges = async task => {
    const { id } = task;
    const oldState = { ...state };
    const oldPlayer = { ...oldState.player };
    const newTasks = [...oldPlayer.tasks];
    const index = newTasks.findIndex(t => t.id === id);
    newTasks[index] = task;

    const url = "http://localhost:3000/api/task/edit";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ task: { ...newTasks[index] }, index: index })
    };
    const response = await fetch(url, options);
    const data = await response.json();

    setState({
      ...oldState,
      player: {
        ...oldPlayer,
        tasks: [...newTasks]
      }
    });

    handleOnCancle(id);
  };

  const handleOnNewDay = async task => {
    const { timestamps, id } = task;
    const { key } = timestamps[timestamps.length - 1];
    //const yesterDay = new Date(key).getDate();
    const yesterDay = new Date(0).getDate();
    const toDay = new Date().getDate();

    if (yesterDay === toDay) return;
	
    switchForPayload(task)._reset(task,stateHelpers);
  };

  const handleOnReturn = task => {
    const _props = {
      task: task,
      onComplete: () => {
        handleOnComplete(task.id);
      },
      onDelete: () => {
        handleOnDelete(task.id);
      },
      onEdit: () => {
        handleOnEdit(task.id);
      },
      onCancle: () => {
        handleOnCancle(task.id);
      },
      onSaveChanges: handleOnSaveChanges,
      onArchive: handleOnArchive,
      onNewDay: handleOnNewDay
    };
    const { payload, id } = task;
    let _task;
    switch (payload) {
      case "Task":
        _task = <TaskComponent key={id} all={_props} />;
        break;
      case "Habit":
        _task = <TaskComponent key={id} all={_props} />;
        break;
      case "Daily":
        _task = <TaskComponent key={id} all={_props} />;
        break;
      case "Streak":
        _task = <StreakComponent key={id} all={_props} />;
        break;
      case "Goal":
        _task = <TaskComponent key={id} all={_props} />;
        break;
      case "Dream":
        _task = <TaskComponent key={id} all={_props} />;
        break;
      case "Challenge":
        _task = <TaskComponent key={id} all={_props} />;
        break;

      default:
        break;
    }
    return _task;
  };
  return (
    <div>
      <h1 className="title is-3"></h1>
      {tasks.map(t => handleOnReturn(t)
      )}
    </div>
  );
};

export default Tasks;

import React from "react";
import TaskComponent from "./task";
import StreakComponent from "./streak";
import ChallengeComponent from "./challenge";
import HabitComponent from "./habit";
import NewDayCheck from "./newDayCheck";
import CreateModal from "./createModal";

import { config } from "../../config";
import Fab from "./fab";
import { Task, Habit, Daily, Streak, Goal, Dream, Challenge } from "./classes";
import UserContext from "../../contexts/UserContext";
import { stat } from "fs";
const { uri } = config;

const Tasks = (props) => {
  const context = React.useContext(UserContext);
  const { state, setState } = context;
  const { player } = state;
  const { tasks } = player;

  //! State Helpers
  const setTasks = (newTasks) => {
    console.log("newTasks:", newTasks);
    const _state = {
      ...state,
      player: { ...state.player, tasks: newTasks },
      ok: true,
    };
    console.log("new state:", _state);
    setState(_state);
  };

  const setTask = (task) => {
    if (task.helpers) delete task.helpers;
    console.log("setTask:", task);
    let _tasks = [...tasks];
    const { id } = task;
    const index = _tasks.findIndex((t) => t.id === id);
    _tasks[index] = task;
    console.log(_tasks);
    setTasks(_tasks);
  };

  const addTask = (task) => {
    if (task.helpers) delete task.helpers;
    const _tasks = [...tasks];
    _tasks.push(task);
    setTasks(_tasks);
  };

  const deleteTask = (task) => {
    if (task.helpers) delete task.helpers;
    const _tasks = [...tasks];
    const { id } = task;
    const index = _tasks.findIndex((t) => t.id === id);
    _tasks.splice(index, 1);
    setTasks(_tasks);
  };

  const stateHelpers = {
    deleteTask,
    addTask,
    setTask,
    setTasks,
  };

  function switchForPayload(task) {
    const { payload } = task;
    let _task;
    switch (payload) {
      case "Task":
        _task = new Task(task).transform(task, stateHelpers);
        break;
      case "Daily":
        _task = new Daily(task).transform(task, stateHelpers);
        break;
      case "Habit":
        _task = new Habit(task).transform(task, stateHelpers);
        break;
      case "Streak":
        _task = new Streak(task).transform(task, stateHelpers);
        break;
      case "Goal":
        _task = new Goal(task).transform(task, stateHelpers);
        break;
      case "Dream":
        _task = new Dream(task).transform(task, stateHelpers);
        break;
      case "Challenge":
        _task = new Challenge(task).transform(task, stateHelpers);
        break;

      default:
        break;
    }
    return _task;
  }
  //! Task Helpers
  const handleOnAdd = (setup) => {
    const task = switchForPayload(setup);
    console.log(setup.payload, "created:", task);
    return addTask(task);
  };

  const handleOnComplete = (_id) => {
    const task = tasks.find((t) => t.id === _id);
    console.log("before completion:", switchForPayload(task));
    switchForPayload(task).complete(task);
  };

  const handleOnFail = (_id) => {
    const task = tasks.find((t) => t.id === _id);
    switchForPayload(task).fail(task);
  };

  const handleOnCompleteYesterday = (_id) => {
    const task = tasks.find((t) => t.id === _id);
    switchForPayload(task).completeYesterday(stateHelpers);
  };

  const handleOnArchive = async (_id) => {
    const task = tasks.find((t) => t.id === _id);
    switchForPayload(task).archive(task);
    handleOnCancle(_id);
  };

  const handleOnEdit = (_id) => {
    const modal = document.getElementById(_id + "-modal");
    const html = document.querySelector("html");
    html.classList.add("is-clipped");
    modal.classList.add("is-active");
  };

  const handleOnCancle = (_id) => {
    const modals = document.querySelectorAll("div.modal");
    modals.forEach((m) => {
      m.classList.remove("is-active");
    });
    const html = document.querySelector("html");
    const body = document.querySelector("body");
    html.classList.remove("is-clipped");
    body.classList.remove("is-clipped");
  };

  const handleOnDelete = async (_id) => {
    const task = tasks.find((t) => t.id === _id);
    deleteTask(task);
    handleOnCancle();
  };

  const handleOnSaveChanges = async (task) => {
    const { id } = task;
    const oldState = { ...state };
    const oldPlayer = { ...oldState.player };
    const newTasks = [...oldPlayer.tasks];
    const index = newTasks.findIndex((t) => t.id === id);
    newTasks[index] = task;

    const url = `${uri.domain}/api/task/edit`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: { ...newTasks[index] }, index: index }),
    };
    const response = await fetch(url, options);
    await response.json();

    setState({
      ...oldState,
      player: {
        ...oldPlayer,
        tasks: [...newTasks],
      },
    });

    handleOnCancle();
  };

  const handleIsNewDay = () => {
    const lastKey = player.lastLogin;
    const lastDay = new Date(lastKey);
    const lastDate = lastDay.getDate();
    const currentKey = Date.now();
    const currentDay = new Date(currentKey);
    const currentDate = currentDay.getDate();

    if (lastKey === 0) {
      return false;
    }
    if (lastDate !== currentDate) {
      return true;
    } else {
      return false;
    }
  };

  const handleOnNewDay = (task) => {
    /*const cb = (task) => {
      if (task.streak > player.highscore) {
        setState({ ...state, player: { ...player, highscore: task.streak } });
        console.log("shouldve set state:", {
          ...state,
          player: { ...player, highscore: task.streak },
        });
      }
    };*/
    // ! Deprecated 19/04/2020
  };

  const handleOnCheckYesterday = (ids) => {
    const _tasks = [];

    ids.forEach((i) => {
      const id = parseInt(i);
      const _task = tasks.find((t) => t.id === id);
      _tasks.push(_task);
    });
    _tasks.forEach((t) => {
      switchForPayload(t).completeYesterday(stateHelpers);
    });

    const nonCompleted = tasks.filter((t) => !_tasks.includes(t));

    // * Handles non-checked Tasks
    nonCompleted.forEach((t) => {
      switchForPayload(t).reset();
    });
    // * Removes Modal
    handleOnCancle();

    // * Update Last Login
    fetch(`${uri.domain}/api/player/update/lastlogin`)
      .then((res) => res.json())
      .then((docs) => console.log(docs));
  };

  const handleOnStreakColor = (task) => {
    const s = task.streak;
    let color = "is-info";
    if (s <= -5) color = "is-danger";
    else if (s < 0 && s > -5) color = "is-link";
    else if (s === 0) {
    } else if (s >= 5 && s < 10) color = "is-primary";
    else if (s >= 10) color = "is-success";
    return color;
  };
  const handleCompleteColor = (task) => {
    const { timestamps } = task;
    const last = timestamps[timestamps.length - 1];
    const { payload, key } = last;
    if (
      new Date(key).getDate() === new Date().getDate() &&
      payload === "onComplete"
    ) {
      return "";
    } else {
      return " is-outlined";
    }
  };
  const handleFailColor = (task) => {
    const { timestamps } = task;
    const last = timestamps[timestamps.length - 1];
    const { payload, key } = last;
    if (
      new Date(key).getDate() === new Date().getDate() &&
      payload === "onFail"
    ) {
      return "";
    } else {
      return " is-outlined";
    }
  };

  const handleOnReturn = (task) => {
    const _props = {
      task: task,
      onComplete: () => {
        handleOnComplete(task.id);
      },
      onCompleteYesterday: () => {
        handleOnCompleteYesterday(task.id);
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
      onFail: () => {
        handleOnFail(task.id);
      },
      onSaveChanges: handleOnSaveChanges,
      onArchive: handleOnArchive,
      onCheckYesterday: handleOnCheckYesterday,
      onNewDay: handleOnNewDay,
      isNewDay: handleIsNewDay,
      onStreakColor: handleOnStreakColor,
      onCompleteColor: handleCompleteColor,
      onFailColor: handleFailColor,
    };
    const { payload, id } = task;
    let _task;
    switch (payload) {
      case "Task":
        _task = <TaskComponent key={id} all={_props} />;
        break;
      case "Habit":
        _task = <HabitComponent key={id} all={_props} />;
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
        _task = <ChallengeComponent key={id} all={_props} />;
        break;

      default:
        break;
    }
    return _task;
  };
  return (
    <div className="container is-widescreen">
      {tasks.map((t) => handleOnReturn(t))}
      <CreateModal onAdd={handleOnAdd} />
      <Fab aria-label="Add" />
      <NewDayCheck
        tasks={tasks}
        onComplete={handleOnComplete}
        onCancle={handleOnCancle}
        onCheckYesterday={handleOnCheckYesterday}
        onCompleteYesterday={handleOnCompleteYesterday}
        onNewDay={handleOnNewDay}
        isNewDay={handleIsNewDay}
      />
    </div>
  );
};

export default Tasks;

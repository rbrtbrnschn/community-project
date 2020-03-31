const router = require("express").Router();
const { PlayerDB, playerSchema } = require("../models/player");
const Player = PlayerDB.model("player", playerSchema);
import { uuid } from "uuidv4";
import fs from "fs";
//import {saveTaskToFile} from "../services/snippets"

interface taskInterface {
  title: String;
  notes: String;
  payload: String;
}

function hash() {
  const id = Math.round(Math.random() * 10000);
  if (id < 1000) {
    return hash();
  } else {
    return id;
  }
}

class _Task {
  task: any;
  constructor(_task: taskInterface) {
    return this.create(_task);
  }
  create(task: taskInterface) {
    let _task;
    switch (task.payload) {
      case "Task":
        _task = new Task(task);
        break;
      case "Habit":
        _task = new Habit(task);
        break;
      case "Daily":
        _task = new Daily(task);
        break;
      case "Streak":
        _task = new Streak(task);
        break;
      case "Goal":
        _task = new Goal(task);
        break;
      case "Dream":
        _task = new Dream(task);
        break;
      case "Challenge":
        _task = new Challenge(task);
        break;
      default:
        break;
    }
    return _task;
  }
}

class Task {
  constructor(_task: taskInterface) {
    return this.create(_task);
  }
  create(task: taskInterface) {
    const { title, notes, payload } = task;
    const onCreate = {
      payload: "onCreate",
      key: Date.now(),
      isComplete: false
    };
    const Task = {
      title: title,
      notes: notes,
      payload: payload,
      id: hash(),
      createdAt: new Date().toLocaleDateString(),
      timestamps: [onCreate],
      isComplete: false
    };
    return Task;
  }
}
class Habit {
  constructor(_task: taskInterface) {
    return this.create(_task);
  }
  create(task: taskInterface) {
    const { title, notes, payload } = task;
    const onCreate = {
      payload: "onCreate",
      key: Date.now(),
      isComplete: false
    };
    const Task = {
      title: title,
      notes: notes,
      payload: payload,
      id: hash(),
      createdAt: new Date().toLocaleDateString(),
      timestamps: [onCreate],
      isComplete: false
    };
    return Task;
  }
}
class Daily {
  constructor(_task: taskInterface) {
    return this.create(_task);
  }
  create(task: taskInterface) {
    const { title, notes, payload } = task;
    const onCreate = {
      payload: "onCreate",
      key: Date.now(),
      isComplete: false
    };
    const Task = {
      title: title,
      notes: notes,
      payload: payload,
      id: hash(),
      createdAt: new Date().toLocaleDateString(),
      timestamps: [onCreate],
      isComplete: false
    };
    return Task;
  }
}
class Streak {
  constructor(_task: taskInterface) {
    return this.create(_task);
  }
  create(task: taskInterface) {
    const { title, notes, payload } = task;
    const onCreate = {
      payload: "onCreate",
      key: Date.now(),
      isComplete: false
    };
    const Task = {
      title: title,
      notes: notes,
      payload: payload,
      id: hash(),
      createdAt: new Date().toLocaleDateString(),
      timestamps: [onCreate],
      isComplete: false
    };
    return Task;
  }
}
class Goal {
  constructor(_task: taskInterface) {
    return this.create(_task);
  }
  create(task: taskInterface) {
    const { title, notes, payload } = task;
    const onCreate = {
      payload: "onCreate",
      key: Date.now(),
      isComplete: false
    };
    const Task = {
      title: title,
      notes: notes,
      payload: payload,
      id: hash(),
      createdAt: new Date().toLocaleDateString(),
      timestamps: [onCreate],
      isComplete: false
    };
    return Task;
  }
}
class Dream {
  constructor(_task: taskInterface) {
    return this.create(_task);
  }
  create(task: taskInterface) {
    const { title, notes, payload } = task;
    const onCreate = {
      payload: "onCreate",
      key: Date.now(),
      isComplete: false
    };
    const Task = {
      title: title,
      notes: notes,
      payload: payload,
      id: hash(),
      createdAt: new Date().toLocaleDateString(),
      timestamps: [onCreate],
      isComplete: false
    };
    return Task;
  }
}
class Challenge {
  constructor(_task: taskInterface) {
    return this.create(_task);
  }
  create(task: taskInterface) {
    const { title, notes, payload } = task;
    const onCreate = {
      payload: "onCreate",
      key: Date.now(),
      isComplete: false
    };
    const Task = {
      title: title,
      notes: notes,
      payload: payload,
      id: hash(),
      createdAt: new Date().toLocaleDateString(),
      timestamps: [onCreate],
      isComplete: false
    };
    return Task;
  }
}


//! Get Task By ID 
// do action of payload with task
router.get("/find/:id/:payload?", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { payload } = req.params;
  const { userID } = req.user;
  const player = await Player.findOne({ playerID: userID });

  const { tasks } = player;
  const task = tasks.find(t => t.id === id);
  const index = tasks.indexOf(task);
  const type = task.payload;
	
  const splitDir = __dirname.split("/");
  splitDir.pop();
  const DEST = splitDir.join("/")+"/archive"
  console.log(DEST);
  
  if (payload) {
    //TODO: TEMPORARY / USE COMPLETE/DELETE/ARCHIVE methods of their Classes
    switch (payload) {
      case "complete":
        tasks.splice(index, 1);
	break;
      case "delete":
        tasks.splice(index, 1);
        break;
      case "archive":
        tasks.splice(index, 1);
	break;
      default:
        break;
    }
    player.markModified("tasks");
    player.save();
  }
  return res.json({task:{...task}
});
});

//! Edit Task
router.post("/edit",async(req,res)=>{
	const { task, index } = req.body;

	const player = await Player.findOne({playerID:req.user.userID});
	player.tasks[index] = task;
	player.markModified("tasks");
	player.save();
	return res.json(task);
	
})
//! New Task
router.post("/new", async (req, res) => {
  const { title, notes, payload } = req.body;
  const _player = await Player.findOne({ playerID: req.user.userID });
  const { tasks } = _player;

  const task = { title: title, notes: notes, payload: payload };
  const _task = new _Task(task);
  _player.tasks.push(_task);
  _player.markModified("tasks");
  _player.save();
  return res.json({ ..._task, ok: true });
});

module.exports = router;

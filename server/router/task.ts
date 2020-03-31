const router = require("express").Router();
const { PlayerDB, playerSchema } = require("../models/player");
const Player = PlayerDB.model("player", playerSchema);
import { exists, read, write } from "../services/snippets";

interface taskCreation {
  title: String;
  notes: String;
  payload: String;
}

function hash(): Number {
  const id = Math.round(Math.random() * 10000);
  if (id < 1000) {
    return hash();
  } else {
    return id;
  }
}
function createTask(taskSetup: taskCreation) {
  const { payload } = taskSetup;
  let _task;
  switch (payload) {
    case "Task":
      _task = new Task(taskSetup);
      break;
    case "Habit":
      _task = new Habit(taskSetup);
      break;
    case "Daily":
      _task = new Daily(taskSetup);
      break;
    case "Streak":
      _task = new Streak(taskSetup);
      break;
    case "Goal":
      _task = new Goal(taskSetup);
      break;
    case "Dream":
      _task = new Dream(taskSetup);
      break;
    case "Challenge":
      _task = new Challenge(taskSetup);
      break;
    default:
      break;
  }
  return _task;
}

function completeTask(task: Task) {
  const stamp = { payload: "onComplete", key: Date.now(), isComplete: true };
  task.timestamps.push(stamp);
  task.isComplete = true;
  task.completedAt = new Date().toLocaleDateString();
  return task;
}

function archiveTask(task: Task) {
  const stamp = { payload: "onArchive", key: Date.now(), isComplete: false };
  task.timestamps.push(stamp);
  task.archivedAt = new Date().toLocaleDateString();
  return task;
}

function sendToArchive(task: Task, userID: String, payload: String) {
  const splitDir = __dirname.split("/");
  splitDir.pop();
  const DEST = splitDir.join("/") + "/archive";
  const path = DEST + "/" + userID + ".json";

  const taskDestination =
    payload === "complete"
      ? "completed"
      : payload === "archive"
      ? "archived"
      : "ERROR";

  const writeTaskToFile = () => {
    read(path, (data: any) => {
      data = JSON.parse(data);
      data[taskDestination].push(task);
      //console.log("written to file:", data);
      write(path, data);
    });
  };
  exists(path, writeTaskToFile);
}

class Task {
  title: String;
  notes: String;
  payload: String;
  id: Number;
  createdAt: String;
  completedAt: any;
  archivedAt: any;
  timestamps: Array<any>;
  isComplete: Boolean;
  test: any;

  constructor(_task: taskCreation) {
    const { title, notes, payload } = _task;
    this.title = title;
    this.notes = notes;
    this.payload = payload;
    this.id = hash();
    this.createdAt = new Date().toLocaleDateString();
    this.timestamps = [
      { payload: "onCreate", key: Date.now(), isComplete: false }
    ];
    this.isComplete = false;
    return this;
  }
}

class Habit extends Task {
  constructor(task: taskCreation) {
    super(task);
  }
}
class Daily extends Task {
  constructor(task: taskCreation) {
    super(task);
  }
}
class Streak extends Task {
  constructor(task: taskCreation) {
    super(task);
  }
}
class Goal extends Task {
  constructor(task: taskCreation) {
    super(task);
  }
}
class Dream extends Task {
  constructor(task: taskCreation) {
    super(task);
  }
}
class Challenge extends Task {
  constructor(task: taskCreation) {
    super(task);
  }
}

//! Get Task By ID
// do action of payload with task
router.get("/find/:id/:payload?", async (req: any, res: any) => {
  const id = parseInt(req.params.id, 10);
  const { payload } = req.params;
  const { userID } = req.user;
  const player = await Player.findOne({ playerID: userID });

  const { tasks } = player;
  const task = tasks.find((t: Task) => t.id === id);
  const index = tasks.indexOf(task);
  //const type = task.payload;

  if (payload) {
    switch (payload) {
      case "complete":
        tasks[index] = completeTask(tasks[index]);
        sendToArchive(tasks[index], player.playerID, payload);
        tasks.splice(index, 1);
        break;
      case "delete":
        tasks.splice(index, 1);
        break;
      case "archive":
        tasks[index] = archiveTask(tasks[index]);
        sendToArchive(tasks[index], player.playerID, payload);
        tasks.splice(index, 1);
        break;
      default:
        break;
    }
    player.markModified("tasks");
    player.save();
  }
  return res.json({ task: { ...task } });
});

//! Edit Task
router.post("/edit", async (req: any, res: any) => {
  let { task, index } = req.body;

  const player = await Player.findOne({ playerID: req.user.userID });
  if (!index) {
    index = player.tasks.findIndex((t: any) => t.id === task.id);
  }
  player.tasks[index] = task;
  player.markModified("tasks");
  player.save();
  return res.json(task);
});
//! New Task
router.post("/new", async (req: any, res: any) => {
  const { title, notes, payload } = req.body;
  const _player = await Player.findOne({ playerID: req.user.userID });
  const { tasks } = _player;

  const task = { title: title, notes: notes, payload: payload };
  const _task = createTask(task);
  _player.tasks.push(_task);
  _player.markModified("tasks");
  _player.save();
  return res.json({ ..._task, ok: true });
});

module.exports = router;

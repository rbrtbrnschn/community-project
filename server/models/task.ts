const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: String,
  title_lower: String,
  notes: String,
  payload: String,
  taskID: Number,
  timeOfCreation: String,
  timeOfCompletion: String,
  category: String,
  hasNotes: Boolean,
  isCompleted: Boolean,
  isDeleted: Boolean,
  isArchived: Boolean,
  hasChecklist: Boolean,
  checklist: Array,
  timestamps: Array
});

const habitSchema = new Schema({
  title: String,
  title_lower: String,
  notes: String,
  payload: String,
  taskID: Number,
  timeOfCreation: String,
  timeOfCompletion: String,
  category: String,
  interval: {
    repeats: String,
    every: Number
  },
  hasNotes: Boolean,
  isCompleted: Boolean,
  isDeleted: Boolean,
  isArchived: Boolean,
  hasChecklist: Boolean,
  checklist: Array,
  difficulty: Object,
  timestamps: Array
});
const dailySchema = new Schema({
  title: String,
  title_lower: String,
  notes: String,
  payload: String,
  taskID: Number,
  timeOfCreation: String,
  interval: {
    repeats: String,
    every: Number
  },
  hasNotes: Boolean,
  isCompleted: Boolean,
  isDeleted: Boolean,
  isArchived: Boolean,
  hasChecklist: Boolean,
  checklist: Array,
  difficulty: Object,
  timestamps: Array
});
const goalSchema = new Schema({
  title: String,
  title_lower: String,
  notes: String,
  payload: String,
  taskID: Number,
  timeOfCreation: String,
  category: String,
  hasNotes: Boolean,
  isCompleted: Boolean,
  isDeleted: Boolean,
  isArchived: Boolean,
  hasChecklist: Boolean,
  checklist: Array,
  difficulty: Object,
  timestamps: Array
});

const streakSchema = new Schema({
  title: String,
  title_lower: String,
  notes: String,
  payload: String,
  taskID: Number,
  timeOfCreation: String,
  category: String,
  hasNotes: Boolean,
  isCompleted: Boolean,
  isDeleted: Boolean,
  isArchived: Boolean,
  streak: Number,
  timesFailed: Number,
  highscore: {
    timestamp: Object,
    value: Number
  },
  difficulty: Object,
  timestamps: Array
});

const dreamSchema = new Schema({
  title: String,
  title_lower: String,
  notes: String,
  payload: String,
  taskID: Number,
  timeOfCreation: String,
  timeOfCompletion: String,
  category: String,
  hasNotes: Boolean,
  isCompleted: Boolean,
  isDeleted: Boolean,
  isArchived: Boolean,
  daysToComplete: Number,
  highscore: {
    timestamp: Object,
    value: Number
  },
  timestamps: Array
});

interface taskInterface {
  title: String;
  notes: String;
  payload: String;
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
      id: uuid(),
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
      id: uuid(),
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
      id: uuid(),
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
      id: uuid(),
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
      id: uuid(),
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
      id: uuid(),
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
      id: uuid(),
      createdAt: new Date().toLocaleDateString(),
      timestamps: [onCreate],
      isComplete: false
    };
    return Task;
  }
}
export { taskInterface, Task, Habit, Daily, Streak, Goal, Dream, Challenge };
module.exports = {
  taskSchema: taskSchema,
  habitSchema: habitSchema,
  dailySchema: dailySchema,
  goalSchema: goalSchema,
  streakSchema: streakSchema,
  dreamSchema: dreamSchema
};

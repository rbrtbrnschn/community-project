const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: String,
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

module.exports = {taskSchema: taskSchema, habitSchema: habitSchema, dailySchema: dailySchema, goalSchema: goalSchema, streakSchema: streakSchema, dreamSchema: dreamSchema}

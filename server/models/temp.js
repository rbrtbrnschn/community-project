const mongoose = require("mongoose");
const keys = require("../config/keys");
const log = require("../config/logMsg");

const Schema = mongoose.Schema;
const collection = keys.db.matchesCollections.collection1;

//! Connection To Mongoose User Collection
// * Matches
var MatchDB = mongoose.createConnection(
  keys.db.uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: collection
  },
  () => {
    console.log(log.db.match.connected, collection);
  }
);
const matchSchema = new Schema({
  matchID: String,
  collectionID: String,
  createdOn: String,
  timestamps: [],
  scores: Array
});

module.exports = { MatchDB, matchSchema };
const mongoose = require("mongoose");
const keys = require("../config/keys");
const log = require("../config/logMsg");

const Schema = mongoose.Schema;
const collection = keys.db.playerCollections.collection1;

//! Connection To Mongoose User Collection
// * Players
var PlayerDB = mongoose.createConnection(
  keys.db.uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: collection
  },
  () => {
    console.log(log.db.player.connected, collection);
  }
);
const playerSchema = new Schema({
  playerID: String,
  username: String,
  opponents: Array,
  tasks: Array,
  locale: String
});

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

module.exports = {
  PlayerDB,
  playerSchema,
  taskSchema,
  habitSchema,
  dailySchema,
  goalSchema,
  streakSchema,
  dreamSchema
};
const mongoose = require("mongoose");
const keys = require("../config/keys");
const log = require("../config/logMsg");

const Schema = mongoose.Schema;
const collection = keys.db.userCollections.collection1;

//! Connection To Mongoose User Collection
// * Users
var UserDB = mongoose.createConnection(
  keys.db.uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: collection
  },
  () => {
    console.log(log.db.user.connected, collection);
  }
);
const oAuthSchema = new Schema({
  provider: String,
  providerUsername: String,
  providerID: String,
  providerAvatar: String
});
const userSchema = new Schema(
  {
    userID: String,
    name: String,
    email: String,
    firstLogin: Boolean,
    oAuth: oAuthSchema,
    createdOn: String,
    country: String
  },
  { typeKey: "$type" }
);

module.exports = { UserDB, userSchema, oAuthSchema };


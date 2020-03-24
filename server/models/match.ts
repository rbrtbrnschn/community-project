const mongoose = require("mongoose");
const { db } = require("../config");

const Schema = mongoose.Schema;
const collection = db.names.matches;

//! Connection To Mongoose User Collection
let MatchDB = mongoose.createConnection(
  db.uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: collection
  },
  () => {
    console.log("Connected To", collection);
  }
);
const matchSchema = new Schema({
  matchID: String,
  socketID: Number,
  collectionID: String,
  createdOn: String,
  timestamps: [],
  scores: Array
});

module.exports = { MatchDB, matchSchema };

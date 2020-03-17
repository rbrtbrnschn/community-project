const mongoose = require("mongoose");
const { db } = require("../config");

const Schema = mongoose.Schema;
const collection = db.names.players;

//! Connection To Mongoose Player Collection

let PlayerDB = mongoose.createConnection(
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
const playerSchema = new Schema({
  playerID: String,
  username: String,
  opponents: Array,
  tasks: Array,
  locale: String
});

module.exports = {
  PlayerDB,
  playerSchema
};


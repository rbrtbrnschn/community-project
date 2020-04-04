const mongoose = require("mongoose");
require('mongoose-long')(mongoose);
var SchemaTypes = mongoose.Schema.Types;
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
  username_lower: String,
  opponents: Array,
  sockets: Array,
  tasks: Array,
  locale: String,
  lastLogin : { type : Date, default: Date.now },
});

module.exports = {
  PlayerDB,
  playerSchema
};


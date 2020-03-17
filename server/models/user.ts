const mongoose = require("mongoose");
const { db } = require("../config");

const Schema = mongoose.Schema;

//! Connection To Mongoose User Collection

let UserDB = mongoose.createConnection(
	db.uri,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		dbName: db.names.users
	},
	()=>{console.log("Connected To",db.names.users)}

);

const userSchema = new Schema({
	userID: String,
	name: String,
	email: String,
	firstLogin: Boolean,
	oAuth: Object,
	createdOn: String,
	country: String
});

module.exports = { UserDB, userSchema}

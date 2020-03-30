//! Imports
const api = require("express").Router();
const sample = require("./sample");
const download = require("./download");
const user = require("./user");
const player = require("./player");
const match = require("./match");
const task = require("./task")
const auth = require("./auth");

api.use("/sample", sample);
api.use("/", download);
api.use("/user",user);
api.use("/player",player);
api.use("/match",match);
api.use("/task",task)
api.use("/auth",auth);

//! Export
module.exports = api;

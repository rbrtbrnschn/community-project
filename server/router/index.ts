//! Imports
const api = require("express").Router();
const sample = require("./sample");
const download = require("./download");

api.use("/sample", sample);
api.use("/", download);

//! Export
module.exports = api;

//! Imports
const api = require("express").Router();
const sample = require("./sample.js");

api.use("/sample",sample);

//! Export
module.exports = api;

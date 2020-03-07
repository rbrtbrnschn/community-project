//! Imports
const express = require("express");

//! Server
const app = express();
const server = app.listen(process.env.PORT || 5000,()=>{
	console.log("Listening On Port", process.env.PORT || 5000);
});

//! Middleware
app.use(express.json());


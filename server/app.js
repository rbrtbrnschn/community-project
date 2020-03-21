//! .env Config
require("dotenv").config({ path: "../.env" });

//! Imports
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");

//! Config
app.enable("trust proxy");
app.use(cors());
// cookieSession
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    keys: ["randomstringhere"]
  })
);
// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
// passport
app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

//! Server
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log("Listening On Port", port);
});

//! Websocket
const io = socketIo(server);
io.set('origins', '*:*');
let connections = [];
io.on("connection", socket => {

	// On Connection
	connections.push(socket);
	console.log("Client Connected. Connections:",connections.length);
	// On WIP
	
	
	// On Disconnect
	socket.on("disconnect",()=>{
		const index = connections.findIndex(s => s.id === socket.id);
		connections.splice(index,1);
		console.log("Client Disconnected. Connections:", connections.length);
	})
})
// Routing
const api = require("./router/index");

//! Middleware
app.use(express.json());

// Routers
app.use("/api", api);

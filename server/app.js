//! .env Config
require("dotenv").config({ path: "../.env" });

//! Imports
const express = require("express");
const http = require("http");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);

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


//! Websocket
 const io = socketIo(server,{
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});
const nsp = io.of("/todo-hub");
nsp.on("connection",(client)=>{
	// On Connect
	client.emit("onConnection","hi")
	
	// On Join Rooms // After 'onConnection'
	client.on("onJoinRooms",socketIDS =>{
		socketIDS.forEach(s=>{
			client.join(s+"");
		})
	})

	// On Send Data To Room
	client.on("onSendToRoom",({socketID, data})=>{
		const room = socketID+"";
		nsp.to(room).emit("onSendToRoom",data);
	})
})


// Routing
const api = require("./router/index");

//! Middleware
app.use(express.json());

// Routers
app.use("/api", api);

//! Server
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log("Listening On Port", port);
});

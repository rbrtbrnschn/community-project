//! .env Config
require("dotenv").config({ path: "../.env" });

//! Imports
const express = require("express");
const http = require("http");
const https = require("https")
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fs = require("fs");
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
// cookie-parser
app.use(cookieParser());
// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
// passport
app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions


//! Websocket
const options =	 {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
};
const io = require("socket.io")();
io.on("connection",client=>{
	console.log(client)
	client.on("onConnection",data=>{
		console.log(data);
	})
})


// Routing
const api = require("./router/index");

//! Middleware
app.use(express.json());

// Routers
app.use("/api", api);

//! Server
const serverOptions = {
	key: fs.readFileSync("key.pem"),
	cert: fs.readFileSync("cert.pem")
}
const port = process.env.PORT || 5000;
//https.createServer(serverOptions,app).listen(port,()=>{
  //console.log("Listening On Port", port);
//})

server.listen(port, () => {
  console.log("Listening On Port", port);
});

//! .env Config
require("dotenv").config({ path: "../.env" });

//! Imports
const express = require("express");
const app = express();
const cors = require("cors");
//! Configuration
// pipe backend requests
// attempt on trying to get oauth to redirect back to 3000 with all cookies | didnt work
app.enable("trust proxy");
app.use(cors());

//! Server
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log("Listening On Port", port);
});
const api = require("./router/index");

//! Middleware
app.use(express.json());

// Routers
app.use("/", api);

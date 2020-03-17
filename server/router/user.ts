//user
const router = require("express").Router();

const { UserDB, userSchema } = require("../models/user");
const User = UserDB.model("user", userSchema);

module.exports = router;

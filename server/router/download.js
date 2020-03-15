const router = require("express").Router();
const config = require("../config");
const fs = require("fs");
router.get("/download", async (req, res) => {
  console.log(config);
  res.json(config);
});

module.exports = router;

const router = require("express").Router();
router.get("/download", async (req, res) => {
  res.download("config.js")
});

module.exports = router;

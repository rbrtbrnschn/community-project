const router = require("express").Router();
const passport = require("passport");

router.post("/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  function(req, res) {
    return res.json({ok:true});
  });

module.exports = router;

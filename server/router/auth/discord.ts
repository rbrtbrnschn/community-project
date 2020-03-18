const passport = require("passport");
const router = require("express").Router();

router.get("/login", passport.authenticate("discord"));
router.get(
  "/redirect",
  passport.authenticate("discord", {
    failureRedirect: "/somethingwentwrong"
  }),
  function(req, res) {
    res.redirect("http://localhost:3000/"); // Successful auth
  }
);

module.exports = router;


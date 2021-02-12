const express = require("express"),
  passport = require("passport"),
  mongoose = require("mongoose"),
  keys = require("../config/keys"),
  router = express.Router();
require("../services/passportTwitterAuth");
// https://www.freecodecamp.org/news/how-to-set-up-twitter-oauth-using-passport-js-and-reactjs-9ffa6f49ef0/

router.get("/auth/twitter", passport.authenticate("twitter"));

router.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect home.
    // console.log(req.headers.host)
    res.redirect('/')
    // res.redirect(keys.redirectDomain); // TODO figure out the bug
  }
);

module.exports = router;

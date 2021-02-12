const express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  keys = require("../config/keys"),
  router = express.Router();
require("../services/passportFacebookAuth");

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    auth_type: "reauthenticate",
    //https://developers.facebook.com/docs/facebook-login/reauthentication/#nonce
    auth_nonce: Math.random().toString(36).substring(7), //  characters picked randomly -
    scope: ["email"],
    /*
  warning in pop up login window:
    You are using a display type of 'page' in a small browser window or popup. For a better user experience, show this dialog with our JavaScript SDK without specifying an explicit display type. The SDK will choose the best display type for each environment. Alternatively, use display type 'popup' if you have special requirements precluding you from using the SDK. This message is only visible to developers of your application.
    */
    display: "page" || "popup" || "touch", // https://github.com/jaredhanson/passport-facebook/issues/29
  })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/signin",
  }),
  (req, res) => {
    //  console.log(req.headers.host)

    // Successful authentication, redirect home.
    // console.log(res);
    // console.log(req.headers.host)
    // res.redirect("/");
    res.redirect(keys.redirectDomain); // TODO figure out the bug
  }
);
module.exports = router;

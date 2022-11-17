const express = require('express'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  keys = require('../config/keys'),
  router = express.Router();
require('../services/passportInstagramAuth');

router.get(
  '/auth/instagram',

  passport.authenticate('instagram', {
    client_id: keys.instagramClientID,
    response_type: 'code',
    redirect_uri: '/',
    failureRedirect: '/signin',
    // scope: 'user_profile',
  }),
  (req, res) => {
    // console.log(req);
    res.send({ res: 'failed' });
  }
);

router.get(
  '/auth/instagram/callback',
  passport.authenticate('instagram', { failureRedirect: '/' }),
  (req, res) => {
    console.log(req);
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

module.exports = router;

const keys = require('../config/keys'),
  passport = require('passport'),
  InstagramStrategy = require('passport-instagram').Strategy,
  User = require('../models/User');

passport.use(
  new InstagramStrategy(
    {
      clientID: keys.instagramClientID,
      clientSecret: keys.instagramClientSecret,
      callbackURL: "/auth/instagram/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('=========')
      console.log(profile);
      try {
        const existingUser = await User.findOne({ 'instagram.id': profile.id });
        console.log(existingUser);
        done()
      } catch (err) {
        console.log(err);
      }
    }
  )
);

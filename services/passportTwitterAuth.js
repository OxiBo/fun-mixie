const passport = require("passport"),
  mongoose = require("mongoose"),
  TwitterStrategy = require("passport-twitter").Strategy, // api - https://developer.twitter.com/en/apps , https://stackoverflow.com/questions/55284254/twitter-creating-app-failed-due-to-invalid-web-url , https://stackoverflow.com/questions/22627083/can-we-get-email-id-from-twitter-oauth-api
  keys = require("../config/keys"),
  User = require("../models/User");

passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.twitterConsumerKey,
      consumerSecret: keys.twitterConsumerSecret,
      callbackURL: "/auth/twitter/callback",
      // userProfileURL: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
    },
    async (token, tokenSecret, profile, done) => {
      // twitter api require valid privacy policy to give access to user email
      const { id, displayName: name } = profile;

      try {
        const userExists = await User.findOne({
          $or: [{ "twitter.id": id }],
        });
        if (userExists) {
          if (!userExists.twitter.id) {
            userExists.twitter.id = id;
            userExists.twitter.token = token;
            // userExists.twitter.email = email;
            userExists.twitter.name = name;
            userExists.save();
          }
          return done(null, userExists);
        }
        const newUser = await new User({
          // email,
          name,
          twitter: { id, name, token },
        }).save();
        return done(null, newUser);
      } catch (err) {
        console.log(err);
        return done(err);
      }
    }
  )
);

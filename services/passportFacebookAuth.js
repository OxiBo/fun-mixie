// https://medium.com/@hammed.roh/creating-passportjs-facebookstrategy-on-localhost-https-1993870e0271

const passport = require("passport"),
  FacebookStrategy = require("passport-facebook").Strategy,
  mongoose = require("mongoose"),
  keys = require("../config/keys"),
  User = require("../models/User");

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookAPIId,
      clientSecret: keys.facebookAPISecret,
      callbackURL: keys.facebookCallBackURL,
      profileFields: ["email", "displayName"],
      proxy: true,
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      const { id, email, name } = profile._json;

      try {
        const userExists = await User.findOne({
          $or: [{ email }, { "facebook.id": id }],
        });
        if (userExists) {
          if (!userExists.facebook.id) {
            userExists.facebook.id = id;
            userExists.facebook.token = accessToken;
            userExists.facebook.email = email;
            userExists.facebook.name = name;
            userExists.save();
          }
          return cb(null, userExists);
        }
        const newUser = await new User({
          email,
          name,
          facebook: { id, name, email, token: accessToken },
        }).save();
        return cb(null, newUser);
      } catch (err) {
        console.log(err);
        return cd(err);
      }
    }
  )
);

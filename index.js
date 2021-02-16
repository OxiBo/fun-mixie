const express = require("express"),
  //   keys = require("./config/keys"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  cookieSession = require("cookie-session"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  path = require("path"),
  keys = require("./config/keys"),
  authRoutes = require("./routes/auth"),
  app = express();

// have to require the model before requiring passport
// require("./models/User");
// register model
// const User = mongoose.model("user");

const User = require("./models/User");
require("./services/passportFacebookAuth");
require("./services/passportTwitterAuth");

app.use(cors()); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options. ; https://en.wikipedia.org/wiki/Cross-origin_resource_sharing   , https://www.udemy.com/course/node-with-react-fullstack-web-development/learn/lecture/7605040?start=667#bookmarks
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(
  cookieSession({
    name: "fun-mixie-session",
    keys: [keys.cookieKey],
    maxAge: 7 * 24 * 60 * 60 * 1000, // a week
  })
);

// database configuration
try {
  mongoose.connect(keys.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });
  console.log("Fun-mixie connected to DB!");
} catch (err) {
  console.log("ERROR:", err.message);
}


app.use(passport.initialize()); // has to be before requiring auth routes
app.use(passport.session()); // has to be before requiring auth routes

const facebookAuthRoute = require("./routes/authFacebook");
const twitterAuthRoute = require("./routes/authTwitter");
app.use(facebookAuthRoute);
app.use(twitterAuthRoute);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  try {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  } catch (err) {
    done(new Error("Failed to deserialize user"));
  }
});
app.use(authRoutes);
const cocktailsRoutes = require("./routes/cocktails");
app.use(cocktailsRoutes);
// app.get("/test", (req, res) => {
//   res.send("Redirected");
// });
// this has to be after all possible rotes!!!
if (process.env.NODE_ENV === "production") {
  // Express will serve production assets like main.css  or main.js files
  app.use(express.static("client/build"));

  // Express will serve index.html if it does not recognize the route

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 4070; // if getting error about server already running on this port - https://stackoverflow.com/questions/9898372/how-to-fix-error-listen-eaddrinuse-while-using-nodejs
app.listen(PORT, () => {
  console.log(`Fun-mixie app is running on port ${PORT}`);
});

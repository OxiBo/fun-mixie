const express = require("express"),
  mongoose = require("mongoose"),
  User = require("../models/User"),
  Post = require("../models/Post"),
  isLoggedIn = require("../middleware/isLoggedIn"),
  router = express.Router();

router.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    console.log(posts);
    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.post("/api/posts/new", isLoggedIn, async (req, res) => {
  const { image, title, body } = req.body;

  try {
    const newPost = await new Post({
      image,
      title,
      body,
      author: req.user._id,
    }).save();

    res.send(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;

const express = require("express"),
  mongoose = require("mongoose"),
  User = require("../models/User"),
  Post = require("../models/Post"),
  isLoggedIn = require("../middleware/isLoggedIn"),
  router = express.Router();

router.get("/api/posts", async (req, res) => {
  const { page, size } = req.query;

  try {
    const [posts] = await Post.aggregate([
      {
        $facet: {
          paginatedResults: [{ $skip: page * size - size}, { $limit: Number(size) }],
          totalCount: [
            {
              $count: "count",
            },
          ],
        },
      },
    ]);

    console.log(posts);
    const { paginatedResults, totalCount } = posts;
    // console.log(paginatedResults)
    res.send({ posts: paginatedResults, totalCount: totalCount[0].count });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.post("/api/posts/new", isLoggedIn, async (req, res) => {
  const { image, largeImage, title, body } = req.body;

  try {
    const newPost = await new Post({
      image,
      largeImage,
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

router.get("/api/posts/show/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    // console.log(post)
    res.send(post);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;

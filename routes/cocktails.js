const { route } = require("./auth");

const express = require("express"),
  mongoose = require("mongoose"),
  User = require("../models/User"),
  Cocktail = require("../models/Cocktail"),
  router = express.Router();

// TODO - create a middleware to check if user is logged in
router.post("/api/like", async (req, res) => {
  try {
    let user = await User.findById(req.user);
    // check if the cocktails info is already in db
    const existedCocktail = await Cocktail.findOne({
      apiId: req.body.apiId.toString(),
    });
    if (existedCocktail) {
      // check if the existed cocktail already liked by the user if cocktail is already in db
      const isLiked = user.cocktails.find(({ _id }) =>
        _id.equals(existedCocktail._id)
      );
      if (isLiked) {
        // deleted from liked if liked before
        await user.cocktails.pull({ _id: existedCocktail._id });
        await user.save();
      } else {
        // add to liked
        await user.cocktails.addToSet({
          _id: existedCocktail._id,
          apiId: req.body.apiId,
        });
        await user.save();
      }
    } else {
      // add cocktail in db
      const newCocktail = await new Cocktail({
        ...req.body.data,
      }).save();
      // add the cocktail in user's liked cocktails list
      await user.cocktails.addToSet({
        _id: newCocktail._id,
        apiId: req.body.apiId,
      });
      await user.save();
    }

    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.get("/api/user-cocktails", async (req, res) => {
  const { page, size } = req.query;
  const startIndex = size * page;
  try {
    const result = await User.aggregate([
      { $match: { _id: req.user._id } },

      {
        $project: {
          total: { $size: "$cocktails" },
          sliced: {
            $slice: ["$cocktails", startIndex, +size],
          }, // https://docs.mongodb.com/manual/reference/operator/aggregation/slice/
          // {
        },
      },
      {
        $lookup: {
          from: "cocktails",
          localField: "sliced._id",
          foreignField: "_id",
          as: "paginated",
        },
      },
      // {
      //   $project: {
      //     total: { $size: "$cocktails" },
      //     portion: {
      //       $slice: ["$cocktails", 0, 2],

      //     }, // https://docs.mongodb.com/manual/reference/operator/aggregation/slice/
      //     // {
      //   },

      // },
    ]);
    // console.log(t[0]);
    const [{ total, paginated }] = result;

    res.send({ total, paginated });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;

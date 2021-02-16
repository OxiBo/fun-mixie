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

module.exports = router;

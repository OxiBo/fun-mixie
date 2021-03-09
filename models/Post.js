const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  image: {
    type: String,
    default: "",
  },
  title: String,
  body: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  //   comments:  [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("post", postSchema);

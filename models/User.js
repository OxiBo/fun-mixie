const mongoose = require("mongoose");
const { Schema } = mongoose;

// const userSchema = new Schema({
//   name: { type: String, lowercase: true },
//   email: {
//     type: String,
//     lowercase: true,
//     match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//     required: true,
//   },
// });

const userSchema = new Schema({
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1534944845791-f9e35a201bf8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  name: String,
  email: {
    type: String,
    lowercase: true,
    match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  },
  facebook: {
    id: String,
    email: String,
    name: String,
    token: String,
  },
  twitter: {
    id: String,
    email: String,
    name: String,
    token: String,
  },
  instagram: {
    id: String,
    email: String,
    name: String,
    token: String,
  },
  // cocktails: [String], //   cocktailId: String,

  cocktails: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "Cocktail" },
      apiId: String,
    },
  ],
  // cocktailId: String, // use this field for quick check if the cocktail has been added to favorites

  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("user", userSchema);

const mongoose = require("mongoose");
const { Schema } = mongoose;

const cocktailSchema = new Schema({
  apiId: String,
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1552729434-12cd1fb0099a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTV8fGRyaW5rJTIwbm8lMjBpbWFnZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", // https://images.unsplash.com/photo-1588680051507-99b0bda3f498?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8ZHJpbmslMjBubyUyMGltYWdlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60    https://images.unsplash.com/photo-1584194081302-deed5be96f8c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=756&q=80
  },
  name: String,
  alcoholic: Boolean,
  glass: String,
  instructions: String,
  ingredients: [Schema.Types.Mixed],
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("cocktail", cocktailSchema);

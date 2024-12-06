const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  playlists: {
    type: [String],
    default: [],
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  subscription: {
    type: String,
    default: "free",
  },
  favourites: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("User", UserSchema);

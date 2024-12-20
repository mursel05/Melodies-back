const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    immutable: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  playlists: {
    type: [String],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    immutable: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  subscription: {
    type: String,
    required: true,
  },
  favourites: {
    type: [String],
    required: true,
  },
  secret: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);

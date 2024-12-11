const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const PlaylistSchema = new Schema({
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
  noa: {
    //number of added
    type: Number,
    required: true,
  },
  time: {
    type: Number,
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
  owner: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  songs: {
    type: [String],
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Playlist", PlaylistSchema);

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const SongSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  artists: {
    type: [String],
    required: true,
  },
  nol: {
    //number of listeners
    type: Number,
    default: 0,
    immutable: true,
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
  time: {
    type: Number,
    required: true,
    min: 1,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  wnol: {
    //weekly number of listeners
    type: Number,
    default: 0,
    immutable: true,
  },
  shareLink: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Song", SongSchema);

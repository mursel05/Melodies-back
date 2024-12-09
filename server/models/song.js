const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const SongSchema = new Schema({
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
  time: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  wnol: {
    //weekly number of listeners
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Song", SongSchema);

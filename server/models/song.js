const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const SongSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  time: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Song", SongSchema);

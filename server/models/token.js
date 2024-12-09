const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const tokenSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    immutable: true,
  },
  token: {
    type: String,
    required: true,
    immutable: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
    immutable: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    immutable: true,
  },
});

module.exports = mongoose.model("Token", tokenSchema);

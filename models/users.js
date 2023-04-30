const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 30,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 128,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    min: 10,
    max: 10,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 30,
  },
  liked: { type: Array, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  isAdmin: {
    type: Boolean,
  },
  name: {
    type: String,
    required: true,
    min: 2,
    max: 30,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 128,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    min: 10,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 20,
  },
  saved: { type: Array, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Users = mongoose.model("users", userSchema);

module.exports = Users;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  cart: { type: Array, required: true },
  date: { type: Date, default: Date.now },
  isDispatched: { type: Boolean, required: true, default: false },
});

const Orders = mongoose.model("orders", ordersSchema);

module.exports = Orders;

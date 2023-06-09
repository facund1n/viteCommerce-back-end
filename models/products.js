const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  title: { type: String, required: true, min: 2, max: 80 },
  description: { type: String, required: true, min: 10, max: 500 },
  image: { type: Array, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, min: 2, max: 80 },
  stock: { type: Number, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Products = mongoose.model("products", productsSchema);
module.exports = Products;

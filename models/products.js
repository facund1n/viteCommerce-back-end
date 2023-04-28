const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  title: { type: String, required: true, min: 2, max: 80 },
  description: { type: String, required: true, min: 10, max: 300 },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, min: 2, max: 80 },
  stock: { type: Number, required: true },
});

const Products = mongoose.model("products", productsSchema);
module.exports = Products;

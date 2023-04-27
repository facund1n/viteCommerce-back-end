const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  title: { type: String, required: true, min: 2, max: 80 },
});

const Products = mongoose.model("products", productsSchema);
module.exports = Products;

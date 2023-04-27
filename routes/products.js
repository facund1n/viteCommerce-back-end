const router = require("express").Router();
const Products = require("../models/product");

router.get("/products", async (req, res) => {
  try {
    const allProducts = await Products.find();
    res.status(200).send(allProducts);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;

const router = require("express").Router();
const Products = require("../models/products");

router
  .get("/products", async (req, res) => {
    try {
      const allProducts = await Products.find();
      res.status(200).send(allProducts);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  })
  .post("/products/new", async (req, res) => {
    const { body } = req;
    try {
      const newProduct = new Products(body);
      await newProduct.save();
      res
        .status(200)
        .json({ newProduct, message: "Uploaded successfully. Redirecting..." });
    } catch (error) {
      res.status(400).json({ error: true, message: "Upload Error" });
    }
  })
  .get("/products/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const oneProduct = await Products.findOne({ _id: id });
      res.status(200).json(oneProduct);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  })
  .patch("/products/update/:id", async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
      const editProduct = await Products.findByIdAndUpdate(id, body, {
        useFindAndModify: false,
      });
      res
        .status(200)
        .json({ editProduct, message: "Edited successfully. Redirecting..." });
    } catch (error) {
      res.status(404).json({
        error: true,
        message: "Failed to edit.",
      });
    }
  })
  .delete("/products/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const delProduct = await Products.findByIdAndDelete({
        _id: id,
      });
      res
        .status(200)
        .json({ delProduct, message: "Deleted successfully. Redirecting..." });
    } catch (error) {
      res.status(404).json({
        error: true,
        message: "Failed to delete.",
      });
    }
  });

module.exports = router;

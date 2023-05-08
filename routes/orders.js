const router = require("express").Router();
const Orders = require("../models/orders");

router
  .get("/orders", async (req, res) => {
    try {
      const allOrders = await Orders.find();
      res.status(200).send(allOrders);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  })
  .post("/orders/new", async (req, res) => {
    const { body } = req;
    try {
      const newOrder = new Orders(body);
      await newOrder.save();
      res.status(200).json({ newOrder, message: "Order sent successfully." });
    } catch (error) {
      res.status(404).json({ error: true, message: "Error try again please" });
    }
  });

module.exports = router;

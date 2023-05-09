const router = require("express").Router();
const Orders = require("../models/orders");
const Users = require("../models/users");

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
  })
  .get("/orders/:id", async (req, res) => {
    const { id } = req.params;

    const userExist = await Orders.findOne({
      userId: id,
    });

    if (userExist === null) {
      return res.status(404).json({ message: "not orders found." });
    }

    try {
      if (id === "6450494eb499f437fa44e0ed") {
        const allOrders = await Orders.find();
        return res.status(200).json(allOrders);
      } else {
        const userOrders = await Orders.find({
          userId: id,
        });
        return res.status(200).json(userOrders);
      }
    } catch (error) {
      return res.status(404).json({ message: "not found" });
    }
  });

module.exports = router;

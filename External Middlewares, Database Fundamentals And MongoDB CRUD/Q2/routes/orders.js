const express = require("express");
const router = express.Router();
const mongoose = require("../db");

const orderSchema = new mongoose.Schema({
  order_id: Number,
  customer_name: String,
  items: [String],
  total_amount: Number,
  order_status: String
});

const Order = mongoose.model("Order", orderSchema);

router.post("/insert-sample", async (req, res) => {
  const data = [
    { order_id: 1, customer_name: "John Doe", items: ["Laptop", "Mouse"], total_amount: 65000, order_status: "pending" },
    { order_id: 2, customer_name: "Jane Smith", items: ["Headphones", "Charger"], total_amount: 3000, order_status: "shipped" },
    { order_id: 3, customer_name: "Alice Johnson", items: ["Mobile Phone"], total_amount: 20000, order_status: "delivered" },
    { order_id: 4, customer_name: "Bob Brown", items: ["Tablet", "Keyboard"], total_amount: 15000, order_status: "pending" },
    { order_id: 5, customer_name: "Chris Green", items: ["Smartwatch"], total_amount: 7000, order_status: "shipped" }
  ];
  await Order.insertMany(data);
  res.json({ message: "Sample data inserted" });
});

router.get("/shipped", async (req, res) => {
  const result = await Order.find({ order_status: "shipped" });
  res.json(result);
});

router.put("/update-amount", async (req, res) => {
  await Order.updateOne({ order_id: 1 }, { $set: { total_amount: 70000 } });
  res.json({ message: "Total amount updated for order_id 1" });
});

router.delete("/delete-order", async (req, res) => {
  await Order.deleteOne({ order_id: 4 });
  res.json({ message: "Order with order_id 4 deleted" });
});

router.get("/by-customer", async (req, res) => {
  const result = await Order.findOne({ customer_name: "Alice Johnson" });
  res.json(result);
});

router.put("/update-status", async (req, res) => {
  await Order.updateOne({ order_id: 2 }, { $set: { order_status: "delivered" } });
  res.json({ message: "Order status updated for order_id 2" });
});

router.get("/amount-gte", async (req, res) => {
  const result = await Order.find({ total_amount: { $gte: 15000 } });
  res.json(result);
});

module.exports = router;

const express = require("express");
const app = express();
const Task = require("./models/Task");

app.use(express.json());

app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

app.get("/tasks", async (req, res) => {
  const { status, dueDate } = req.query;
  let filter = {};
  if (status) filter.status = status;
  if (dueDate) filter.dueDate = { $eq: new Date(dueDate) };
  const tasks = await Task.find(filter);
  res.json(tasks);
});

app.put("/tasks/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

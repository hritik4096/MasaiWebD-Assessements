const mongoose = require("../db");

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  dueDate: Date
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;

const mongoose = require('../config/db');

const taskSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  description: String,
  priority: String,
  isCompleted: { type: Boolean, default: false },
  completionDate: Date,
  dueDate: Date,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

const Task = require('../models/task.model');

exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  const filter = {};
  if (req.query.priority) filter.priority = req.query.priority;
  if (req.query.isCompleted) filter.isCompleted = req.query.isCompleted === 'true';
  const tasks = await Task.find(filter);
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, priority, description, isCompleted } = req.body;

  const updateFields = {};
  if (title) updateFields.title = title;
  if (priority) updateFields.priority = priority;
  if (description) updateFields.description = description;
  if (isCompleted !== undefined) {
    updateFields.isCompleted = isCompleted;
    if (isCompleted) updateFields.completionDate = new Date();
  }

  try {
    const task = await Task.findByIdAndUpdate(id, updateFields, { new: true });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTasksByPriority = async (req, res) => {
  const { priority } = req.query;
  if (!priority) return res.status(400).json({ error: "Priority filter is required" });

  const result = await Task.deleteMany({ priority });
  res.json({ message: `${result.deletedCount} task(s) deleted` });
};

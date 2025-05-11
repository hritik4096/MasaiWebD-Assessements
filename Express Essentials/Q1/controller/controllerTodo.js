const { readTodos, writeTodos } = require('../models/todoModel');

const getAllTodos = (req, res) => {
  const todos = readTodos();
  res.status(200).json(todos);
};

const createTodo = (req, res) => {
  const { title, completed } = req.body;
  if (!title || typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Invalid input' });
  }
  const todos = readTodos();
  const newTodo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    title,
    completed
  };
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
};

const updateTodo = (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const todos = readTodos();
  const index = todos.findIndex(t => t.id === parseInt(id));
  if (index === -1) return res.status(404).json({ error: 'Todo not found' });
  if (title) todos[index].title = title;
  if (typeof completed === 'boolean') todos[index].completed = completed;
  writeTodos(todos);
  res.status(200).json(todos[index]);
};

const deleteTodo = (req, res) => {
  const { id } = req.params;
  let todos = readTodos();
  const newTodos = todos.filter(t => t.id !== parseInt(id));
  if (newTodos.length === todos.length) return res.status(404).json({ error: 'Todo not found' });
  writeTodos(newTodos);
  res.status(200).json({ message: 'Todo deleted successfully' });
};

const searchTodo = (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Query required' });
  const todos = readTodos();
  const results = todos.filter(t => t.title.toLowerCase().includes(q.toLowerCase()));
  if (results.length === 0) return res.status(404).json({ message: 'No todos found' });
  res.status(200).json(results);
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  searchTodo
};
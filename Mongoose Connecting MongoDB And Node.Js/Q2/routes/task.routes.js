const express = require('express');
const router = express.Router();
const controller = require('../controllers/task.controller');
const { validateTask } = require('../middleware/task.middleware');

router.post('/tasks', validateTask, controller.createTask);
router.get('/tasks', controller.getTasks);
router.patch('/tasks/:id', validateTask, controller.updateTask);
router.delete('/tasks', controller.deleteTasksByPriority);

module.exports = router;

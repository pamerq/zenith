const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');
const authenticateToken = require('../middlewares/authMiddleware');

// Create a new task
router.post('/', authenticateToken, TaskController.createTask);

// Get all tasks
router.get('/', authenticateToken, TaskController.getTasks);

// Get a single task by ID
router.get('/:id', authenticateToken, TaskController.getTask);

// Update a task by ID
router.put('/:id', authenticateToken, TaskController.updateTask);

// Delete a task by ID
router.delete('/:id', authenticateToken, TaskController.deleteTask);

module.exports = router;

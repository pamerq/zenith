const express = require('express');
const router = express.Router();
const TaskConfigController = require('../controllers/taskConfigController');

// Rutas para Status
router.get('/statuses', TaskConfigController.getAllStatuses); // Obtener todos los Status
router.post('/statuses', TaskConfigController.createStatus); // Crear un nuevo Status

// Rutas para ViewMode
router.get('/viewModes', TaskConfigController.getAllViewModes); // Obtener todos los ViewModes
router.post('/viewModes', TaskConfigController.createViewMode); // Crear un nuevo ViewMode

// Rutas para Priority
router.get('/priorities', TaskConfigController.getAllPriorities); // Obtener todas las Prioridades
router.post('/priorities', TaskConfigController.createPriority); // Crear una nueva Prioridad

module.exports = router;
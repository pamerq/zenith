const { Status, ViewMode, Priority } = require('../models/taskConfig');
const { sendResponse, handleError } = require('../utils/helpers');

// Controlador para manejar las solicitudes de Status
const getAllStatuses = async (req, res) => {
  try {
    const statuses = await Status.find();
    sendResponse(res, 200, statuses);
  } catch (error) {
    handleError(res, error, 'Error getting statuses');
  }
};

// Controlador para manejar la creación de un nuevo Status
const createStatus = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }
    const newStatus = new Status({ name, description });
    await newStatus.save();
    sendResponse(res, 201, newStatus, 'Status created successfully');
  } catch (error) {
    handleError(res, error, 'Error creating status');
  }
};

// Controlador para manejar las solicitudes de ViewMode
const getAllViewModes = async (req, res) => {
  try {
    const viewModes = await ViewMode.find();
    res.status(200).json(viewModes); // Enviar todos los modos de vista
  } catch (error) {
    console.error('Error al obtener los modos de vista:', error);
    res.status(500).json({ message: 'Error al obtener los modos de vista' });
  }
};

// Controlador para manejar la creación de un nuevo ViewMode
const createViewMode = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newViewMode = new ViewMode({ name, description });
    await newViewMode.save();
    res.status(201).json(newViewMode); // Devuelve el modo de vista creado
  } catch (error) {
    console.error('Error al crear el modo de vista:', error);
    res.status(500).json({ message: 'Error al crear el modo de vista' });
  }
};

// Controlador para manejar las solicitudes de Priority
const getAllPriorities = async (req, res) => {
  try {
    const priorities = await Priority.find();
    sendResponse(res, 200, priorities);
    //res.status(200).json(priorities); // Enviar todas las prioridades
  } catch (error) {
    console.error('Error al obtener las prioridades:', error);
    res.status(500).json({ message: 'Error al obtener las prioridades' });
  }
};

// Controlador para manejar la creación de una nueva Priority
const createPriority = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newPriority = new Priority({ name, description });
    await newPriority.save();
    res.status(201).json(newPriority); // Devuelve la prioridad creada
  } catch (error) {
    console.error('Error al crear la prioridad:', error);
    res.status(500).json({ message: 'Error al crear la prioridad' });
  }
};

module.exports = {
  getAllStatuses,
  createStatus,
  getAllViewModes,
  createViewMode,
  getAllPriorities,
  createPriority,
};

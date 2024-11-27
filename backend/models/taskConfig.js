const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' }, 
});

// Esquema para la prioridad (priority)
const prioritySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' }, 
});

// Esquema para el modo de vista (viewMode)
const viewModeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' }, 
});

const Status = mongoose.model('Status', statusSchema);
const Priority = mongoose.model('Priority', prioritySchema);
const ViewMode = mongoose.model('ViewMode', viewModeSchema);

module.exports = { Status, ViewMode, Priority };

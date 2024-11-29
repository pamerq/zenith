const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true, // The title of the task is required
  },
  priority: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Priority', // Referencia al modelo Priority
    required: true, // La prioridad debe ser obligatoria
  },
  description: {
    type: String,
    // Description is optional
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status', // Referencia al modelo Status
    required: true, // El estado debe ser obligatorio
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true, // A task must be associated with a user
  },
  createDate: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

module.exports = mongoose.model('Task', TaskSchema);

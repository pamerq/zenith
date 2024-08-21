const mongoose = require('mongoose');

// Define the schema for a task
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // The title of the task is required
  },
  description: {
    type: String,
    // Description is optional
  },
  completed: {
    type: Boolean,
    default: false, // Default value for completed is false
  },
});

// Create and export the Task model based on the schema
module.exports = mongoose.model('Task', taskSchema);

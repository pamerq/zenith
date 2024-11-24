const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true, // The title of the task is required
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'], // Allowed values for priority
    default: 'Low', // Default priority is Low
  },
  description: {
    type: String,
    // Description is optional
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'], // Allowed values for status
    default: 'Pending', // Default status is Pending
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

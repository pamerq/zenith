const Task = require('../models/task'); 
const User = require('../models/user');
const {Status, Priority} = require('../models/taskConfig'); 
const jwt = require('jsonwebtoken');

exports.createTask = async (req, res) => {

  try {
    const {title, priority, description, deadline} = req.body; 

    //console.log('Received data:', { title, priority, description });

    if (!title || !description || !priority || !deadline) {
      return res.status(400).json({ message: 'Title, description, priority and deadline are required.' });
    }

    if (new Date(deadline) < new Date()) {
      return res.status(400).json({ 
        message: 'Deadline must be a future date.' 
      });
    }

    if (!deadline || isNaN(new Date(deadline).getTime())) {
      return res.status(400).json({ message: 'Deadline is not valid.' });
    }
    
    const taskStatus = 'Pending';

    //const foundPriority = await Priority.findOne({ name: priority });

    const foundPriority = await Priority.findById(priority);
    if (!foundPriority) {
      return res.status(400).json({ message: 'Invalid priority.' });
    }

    //console.log('Found priority:', foundPriority);

    const foundStatus = await Status.findOne({ name: taskStatus });

    if (!foundStatus) {
      return res.status(400).json({ message: 'Invalid status.' });
    }

    //console.log('Found status:', foundStatus);

    // Asegúrate de que req.user esté definido
    //console.log('User from token:', req.user);


    const task = new Task({title, description,  priority: foundPriority._id, 
      status: foundStatus._id, user: req.user._id, deadline: new Date(deadline),});

    const savedTask = await task.save();
    //res.status(201).json(savedTask);

    res.status(201).json({ message: 'Task created successfully',
      task: savedTask,
    });

  }catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

exports.getTasks = async (req, res) => {

   try {
    const tasks = await Task.find({ user: req.user._id }); 
    //const tasks = await Task.find({ user: req.user._id })
    //.populate('priority', 'name')
    //.populate('status', 'name');
    res.status(200).json(tasks); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }

};

exports.getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id, user: req.user._id });
    //  .populate('priority', 'name')
    //  .populate('status', 'name');
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error('Error retrieving task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!updates.status && !updates.description && !updates.priority) {
      return res.status(400).json({ message: 'No valid fields provided for update' });
    }

    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user._id },
      updates,
      { new: true } 
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};

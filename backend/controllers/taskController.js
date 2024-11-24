const Task = require('../models/task'); 
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.createTask = async (req, res) => {

  try {
    const {title, description, priority = 'Low'} = req.body; 

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required.' });
    }

    const task = new Task({title, description, priority, status: 'Pending', user: req.user._id,});

    const savedTask = await task.save();
    //res.status(201).json(savedTask);

    res.status(201).json({ message: 'Task created successfully',
      task: savedTask,
    });

  }catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

exports.getTasks = (req, res) => {
   try {
    const tasks = await Task.find({ user: req.user._id }); 
    res.status(200).json(tasks); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

exports.getTask = (req, res) => {
  const { id } = req.params;
  res.send(`Get task with ID: ${id}`);
};

exports.updateTask = (req, res) => {
  const { id } = req.params;
  res.send(`Update task with ID: ${id}`);
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;
  res.send(`Delete task with ID: ${id}`);
};

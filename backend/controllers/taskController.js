const Task = require('../models/task'); 
const User = require('../models/user');
const {Status, Priority} = require('../models/taskConfig'); 
const jwt = require('jsonwebtoken');

exports.createTask = async (req, res) => {

  try {
    const {title, priority, description} = req.body; 

    //console.log('Received data:', { title, priority, description });

    if (!title || !description || !priority) {
      return res.status(400).json({ message: 'Title, description, and priority are required.' });
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


    const task = new Task({title, description,  priority: foundPriority._id, status: foundStatus._id, user: req.user._id});

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
    //console.log(req.user);
    const tasks = await Task.find({ user: req.user._id }); 
    //const tasks = await Task.find();
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

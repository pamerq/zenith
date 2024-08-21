exports.createTask = (req, res) => {
  res.send('Create a new task');
};

exports.getTasks = (req, res) => {
  res.send('Get all tasks');
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

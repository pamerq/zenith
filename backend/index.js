const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5001;

//MongoDB
mongoose.connect('mongodb://localhost:27017/zenith', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB', error);
});

// Middleware JSON
app.use(express.json());

// Use routes
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

const testRoutes = require('./routes/testRoutes');
app.use('/api/test', testRoutes);

// Init server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


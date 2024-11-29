const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5001;

app.use(cors({
  origin: 'http://localhost:3000', // Especifica el origen permitido
  methods: 'GET,POST,PUT,DELETE',
  credentials: true // Si ne cesitas enviar cookies o autenticación
}));

// Middleware JSON
app.use(express.json());

//MongoDB
mongoose.connect('mongodb://localhost:27017/zenith', {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB', error);
});

// Use routes
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const configRoutes = require('./routes/taskConfigRoutes');
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/config', configRoutes);

const testRoutes = require('./routes/testRoutes');
app.use('/api/test', testRoutes);

// Init server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const mongoose = require('mongoose');
const { Status, ViewMode, Priority } = require('../models/taskConfig');
console.log('Modelos cargados correctamente:', { Status, ViewMode, Priority });


// Datos iniciales para Status
const initialStatuses = [
  { name: 'Pending', description: 'Tasks that are not started yet' },
  { name: 'In Progress', description: 'Tasks that are being worked on' },
  { name: 'Completed', description: 'Tasks that have been completed' },
];

// Datos iniciales para ViewMode
const initialViewModes = [
  { name: 'By Status', description: 'Display tasks based on their status' },
  { name: 'By Date', description: 'Display tasks based on their creation date' },
  { name: 'By Priority', description: 'Display tasks based on their priority' },
];

// Datos iniciales para Priority
const initialPriorities = [
  { name: 'Low', description: 'Low priority tasks' },
  { name: 'Medium', description: 'Medium priority tasks' },
  { name: 'High', description: 'High priority tasks' },
];

const initializeData = async () => {
  try {
  	
	await mongoose.connect('mongodb://localhost:27017/zenith')
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB', error);
      });

    // Eliminar los registros actuales para evitar duplicados
    await Status.deleteMany({});
    await ViewMode.deleteMany({});
    await Priority.deleteMany({});

    // Insertar los datos iniciales en las colecciones
    await Status.insertMany(initialStatuses);
    await ViewMode.insertMany(initialViewModes);
    await Priority.insertMany(initialPriorities);

    console.log('Data initialized successfully');

    // Cerrar la conexión
    mongoose.connection.close();
  } catch (error) {
    console.error('Error initializing data:', error);
  }
};

// Ejecutar el script de inicialización
initializeData();

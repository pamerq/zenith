const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Registrar un nuevo usuario
router.post('/register', UserController.register);

// Iniciar sesión
router.post('/login', UserController.login);

router.get('/profile', UserController.getUser);

module.exports = router;

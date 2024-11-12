const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware'); 


// Registrar un nuevo usuario
router.post('/register', UserController.register);

// Iniciar sesión
router.post('/login', UserController.login);

router.get('/profile', authenticateToken, UserController.getUser);

module.exports = router;

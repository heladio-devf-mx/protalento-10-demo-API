// Importar las dependencias
const express = require('express');
const { createUser } = require('../controllers/UsersController');
const { validateRole, validateToken, encryptPassword } = require('../middlewares/AuthMiddleware');

// Creo mi router / gestor de rutas
const userRoutes = express.Router();
// Le agrego rutas (al router) para que las atienda
// GET, POST, PUT, PATCH, DELETE (HTTP)
// Ruta con varios middlewares
// userRoutes.get('/users', validateToken, validateRole, usersController.getAllUsers);

userRoutes.post('/users', encryptPassword, createUser);

module.exports = userRoutes;

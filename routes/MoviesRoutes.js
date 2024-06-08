// Importar las dependencias
const express = require('express');
const moviesController = require('../controllers/MoviesController');
const { validateToken, validateRole } = require('../middlewares/AuthMiddleware');

// Creo mi router / gestor de rutas
const moviesRoutes = express.Router();
// Le agrego rutas (al router) para que las atienda
// GET, POST, PUT, PATCH, DELETE (HTTP)
moviesRoutes.get('/movies', moviesController.getMovies);
// Ruta con varios middlewares
moviesRoutes.post('/movies', validateToken, validateRole, moviesController.createMovie);

module.exports = moviesRoutes;

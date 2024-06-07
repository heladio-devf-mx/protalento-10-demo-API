// Importar las dependencias
const express = require('express');
const moviesController = require('../controllers/MoviesController');

// const dotenv = require('dotenv');

// dotenv.config(); // Configurar dotenv
// Creo mi router / gestor de rutas
const moviesRoutes = express.Router();
// Le agrego rutas (al router) para que las atienda
// GET, POST, PUT, PATCH, DELETE (HTTP)
moviesRoutes.get('/movies', moviesController.getMovies);

module.exports = moviesRoutes;

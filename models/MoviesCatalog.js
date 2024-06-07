// 1. Importar mongoose
const mongoose = require("mongoose");

// 2. Definir/Crear el Schema
const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  overview:{
    type: String,
    // required: true
  },
  release_date: {
    type: String,
    // default: true
  },
  poster_path: {
    type: String,
    // default: true
  }
});

// 3. Crear el modelo y exportarlo
const MoviesCatalog = mongoose.model('movies_catalog', moviesSchema);

module.exports = MoviesCatalog;

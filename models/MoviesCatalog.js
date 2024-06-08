// 1. Importar mongoose
const mongoose = require("mongoose");
const SchemaTypes = mongoose.SchemaTypes; // Typos de datos de mongoose

// 2. Definir/Crear el Schema
const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  overview:{
    type: String,
    required: true
  },
  popularity: {
    type: SchemaTypes.Decimal128
  },
  vote_count: {
    type: Number
  },
  release_date: {
    type: String,
    default: Date.now
  },
  poster_path: {
    type: String,
    default: '/placeholder.jpg'
  }
});

// 3. Crear el modelo y exportarlo
const MoviesCatalog = mongoose.model('movies_catalog', moviesSchema);

module.exports = MoviesCatalog;

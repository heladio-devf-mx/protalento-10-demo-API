// 1. Importar dependencias (modelos, middlewares, utils)
// El modelo de moviesCatalog me permitirá acceder a la BD
const MoviesCatalog = require("../models/MoviesCatalog");

// Ejrmplpo de función del Middleware
// const cors = (request, response, next) => {
//  next()
//}; 

const getMovies = async (request, response) => {
  // return response.send(`Próximamente la lista de películas`)

  const afterDate = request.query.afterDate;
  let moviesList = [];

  try {
    if (afterDate) {
      moviesList = await MoviesCatalog.where("release_date", ">", afterDate);
    } else {
      moviesList = await MoviesCatalog.find();
    }
  
    response.send({
      success: true,
      data: moviesList
    });
  } catch(error) {
    console.log('Error al obtener las películas:', error);
    response.status(500).send({
      success: false,
      message: error.message
    });
  }
}

const createMovie = async (request, response) => {
  // Tomar los datos de la petición para registrar la película
  const movieData = request.body;
  // console.log(movieData);

  // Guardar la película en la BD
  try {
    const newMovie = new MoviesCatalog(movieData);
    const result = await newMovie.save();
    // console.log(result);
    response.status(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    // Lógica de manejo de errores
    let errorMessage = 'La película no se puede guardar, revisa la información y vuelve a intentarlo.';
    if (error.code === 11000) {
      errorMessage = 'La película ya existe.';
    }
    console.log('Error al crear una nueva película:', error);
    response.status(500).send({
      success: false,
      code: error.code,
      message: errorMessage // error.message
    });
  }
}

module.exports = { getMovies, createMovie };

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

module.exports = { getMovies };

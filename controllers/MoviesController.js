// 1. Importar dependencias (modelos, middlewares, utils)
// El modelo de moviesCatalog me permitirá acceder a la BD
const MoviesCatalog = require("../models/MoviesCatalog");

const getMovies = async (request, response) => {
  // return response.send(`Próximamente la lista de películas`)
  try {
    const moviesList = await MoviesCatalog.find();
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

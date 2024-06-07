const mongoose = require("mongoose");
// Definiendo la función para conectar nuestro server con la BD MongoDB
const connect = () => {
  // conexión a la BD sucede en esta función...
  mongoose.connect(process.env.DB_URL);
  // console.log(process.env.DB_URL);
  const connection = mongoose.connection;

  connection.once('open', () => {
    console.log('Base de datos conectada exitosamente!');
  });

  connection.on('error', (error) => {
    console.error(`Hubo un error al conectar la base de datos: ${error}`);
  });
};

// exportamos para usar en otro lugar
module.exports = { connect };

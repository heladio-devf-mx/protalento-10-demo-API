// 1. Llamar la biblioteca express y cors
const express = require("express");
const cors = require("cors");
// 1.1 Importar dotenv para leer valriables de entorno
const dotenv = require("dotenv");
dotenv.config(); // Configurar dotenv
// 1.3 Inportar la configuración de la BD
const db = require("./config/database");
// 1.4 Importar las rutas
const moviesRoutes = require("./routes/MoviesRoutes");
const usersRoutes = require("./routes/UsersRoutes");
const authRoutes = require("./routes/AuthRoutes");

// Declaración del Puerto para mi aplicación Backend
const PORT = process.env.PORT || 3000;

// 2. Crear una instancia de express para mi aplicación
const app = express();

// 2.1 configuración de mi aplicación
app.use(cors());  // poder dar acceso a otras aplicaciones (react)
app.use(express.json()); // json me permite recibir información en formato json

// 3. Declarar una ruta de prueba (http://localhost:3003/) 
app.get("/", (request, response) => {
  console.log(request.url);
  // request es un objeto que contiene la información de la petición
  response.status(200).send({ message: `Hola alumnos de protalento!` });
});
// 3.1 Rutas de las películas
app.use('/api/v1', moviesRoutes);
app.use('/api/v1', usersRoutes);
app.use('/api/v1', authRoutes);

// 4. Conectar con la Base de Datos
db.connect();

// 5. Lanzar/Levantar el servidor
app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto: " + PORT);
});
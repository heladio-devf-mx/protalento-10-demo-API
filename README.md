# Proyecto para API con Express y MongoDB

## Setup
- npm init -y
- git init
- create ```.gitignore``` para evitar subir la carpeta ```node_modules``` y el archivo ```.env```
### install dependedencias obligatorias:
  - express
  - bcrypt
  - cors
  - jsonwebtoken
  - mongoose
#### Para instalarlos con un comando:
  - ```npm install -E express bcrypt cors jsonwebtoken mongoose``` standard (eslint, es opcional)
### instalar las dependencias opcionales
  - dotenv
  - nodemon
#### Para instalar con
  ```npm i -E -D nodemon dotenv```
### (Opcional) Agregar la opción para importar módulos como ES6 de JS en el archivo package.json:
  - ```"type": "module",```

### Crea el archivo principal (script) ```server.js``` para levantar un server básico d ela aplicación.
```
  - Escribir el código para tener listo mi servidor.
  // 1. Llamar la biblioteca express y cors
  const express = require("express");
  const cors = require("cors");
  // 1.1 Importar dotenv para leer valriables de entorno
  const dotenv = require("dotenv");
  dotenv.config(); // Configurar dotenv

  // 1.2 Declaración del Puerto para mi aplicación Backend
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

  // 4. Lanzar/Levantar el servidor
  app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto 3000");
  });
```
### Configura scripts "dev" para arrancar el proyecto y "start" para producción. El plugin "standard" para eslint (es opcional).
### Scripts usados en package.json:
  ```
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
  ```

### Probar el server con el comando
  - ```npm run dev```
  - ```npm run start```

### Primer commit.
### Crear repositorio en Github y Subir mi proyecto.

## Configurar el acceso a la BD
1. Crear carpeta ```config``` y adentro el archivo ```database.js```
con el contenido necesario.
2. Actualizar en el archivo ```.env``` la variable de la BD llamada:
  - DB_URL
  Se verá algo similar a:
  ```DB_URL=mongodb+srv://USUARIO:PASSWORD@clusterprotalento.q1xzhhj.mongodb.net/NOMBRE_BD?retryWrites=true&w=majority&appName=ClusterProtalento```
3. Hacer la conexión con la BD desde el server.
4. Probar con el comando de ejecución de la aplicación ```npm run dev```
  Deberá imprimir el mensaje "Base de datos conectada exitosamente!" o similar... 
5. Detener aplicación /servidor es con ```Ctrl + C```.

## Crear Rutas para el CRUD de mi recurso(movies) del API.
1. Crear carpeta ```routes``` y adentro el archivo correspondiente ```MoviesRoutes.js```
con el contenido necesario.
## Crear Controladores para el CRUD de mi recurso(movies) del API.
1. Crear carpeta ```controllers``` y adentro el archivo ```MoviesControllers.js```
con el contenido necesario.
#### Crear los métodos para el CRUD en el controlador
- '/movies'- getMovies - GET
  - Este método usa el modelo para comunicarse con la BD Mongo.

## Crear modelos con mongoose para que los usen los controladores
1. Crear carpeta ```models``` y adentro el archivo ```MoviesCatalog.js```
con el contenido necesario.
  1. Importar mongoose
  2. Definir el Schema (campos, sus tipos y restricciones)
  3. Crear el modelo a partir del Schema.
  4. exportar el modelo para que lo use el controlador.
  
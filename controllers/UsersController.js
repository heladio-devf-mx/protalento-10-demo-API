// 1. Importar dependencias (modelos, middlewares, utils)
// El modelo de User me permitirá acceder a la BD
const UserModel = require("../models/User");

const createUser = async (request, response) => {
  // Tomar los datos de la petición para registrar la película
  const { email, role } = request.body;
  const { encryptedPassword } = request;  // req.encryptedPassword
  // Guardar la película en la BD
  try {
    const newUser = new UserModel({
      email,
      encryptedPassword: encryptedPassword,
      role
    });
    const result = await newUser.save();
    console.log("Usuario creado en controller", result);
    response.status(201).send({
      success: true,
      message: 'Usuario creado correctamente'
    });
  } catch (error) {
    // Lógica de manejo de errores
    let errorMessage = 'El usuario no se puede guardar, revisa la información y vuelve a intentarlo.';
    if (error.code === 11000) {
      errorMessage = 'El usuario ya existe.';
    }
    console.log('Error al crear un nuevo usuario:', error.message);
    response.status(500).send({
      success: false,
      code: error.code,
      message: errorMessage // error.message
    });
  }
}

module.exports = { createUser };

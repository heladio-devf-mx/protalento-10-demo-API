// 1. Importar dependencias (modelos, middlewares, utils)
// El modelo de User me permitirá acceder a la BD
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (request, response) => {
  const { email, password } = request.body;
  const user = await UserModel.findOne({ email });
  const secret = process.env.SECRET;  // Obtenemos la palabra secreta para validar los tokens

  if (user) {
    bcrypt.compare(password, user.encryptedPassword, (err, result) => {
      if (result) {
        // res.send({message: "Login correcto"}); // Mandar el JWT
        // Crear token
        const token = jwt.sign({
            id: user._id,
            email: user.email,
            role: user.role
          },
          secret
        );

        response.send({
          success: true,
          message: "Login correcto",
          token
        });
      } else {
        response.status(401).send({
          success: false,
          message: "Password incorrecto"
        });
      }
    });
  } else {
    console.log("Usuario no encontrado.");
    response.status(404).send({
      success: false,
      message: "Usuario no encontrado"
    });
  }
}

module.exports = { login };

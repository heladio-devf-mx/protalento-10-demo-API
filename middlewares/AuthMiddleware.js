const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// Este middleware me ayudará a validar que venga un token y que es válido
const validateToken = (req, res, next) => {
  // Obtener el encabezado Authorization: Bearer <token>
  const authHeader = req.headers.authorization;
  console.log("¿Tiene encabezado authorization?: " + !!authHeader);
  const secret = process.env.SECRET;  // Obtenemos la palabra secreta para validar los tokens

  // 1. Validar que exista el token en la petición
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // Bearer <token>
    return res.status(400).send({
      success: false,
      message: 'Petición incorrecta. (Falta el token)'
    }); // bad request / petición incorrecta
  }

  // 2. Validar el token
  const token = authHeader.slice(7);  // sacar sólo el token del encabezado
  try {
    const payload = jwt.verify(token, secret);
    // le agregamos el payload al request en la propiedad user
    req.userPayload = payload;
    console.log("Payload: ", { payload });

    next(); // avanzamos al siguiente paso de la petición (middleware)
  } catch (error) {
    console.log("Error en la validación del Token: " + error.message);
    res.status(401).send({
      success: false,
      message: 'Petición incorrecta. (Token inválido)'
    });;
  }
}

const validateRole = (req, res, next) => {
  // Validar el rol del usuario (es la parte de la autorización)
  console.log("Payload: ", { payload });
  if (req.userPayload.role !== "admin") { // usuario, operador
    return res.status(403).send({
      success: false,
      message: 'Permisos insuficientes.'
    });  // no autorizado
  }

  next(); // avanzamos al siguiente paso de la petición (middleware)
} 

const encryptPassword = async (req, res, next) => {
  const { password } = req.body;
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);  // generamos una cadena a partir del password
    // const user = await UserModel.create({ email, encryptPassword, role });
    console.log('Middleware for encryption ', password, encryptedPassword);
    req.encryptedPassword = encryptedPassword;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Algo salió mal al encriptar el password.' // cambiar por algo más seguro
    });
  }
}

module.exports = { validateToken, validateRole, encryptPassword };

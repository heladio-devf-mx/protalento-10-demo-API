const jwt = require("jsonwebtoken");
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

    next(); // avanzamos al siguirente paso de la petición
  } catch (error) {
    console.log("Error en la validación del Token: " + error.message);
    res.status(401).send({
      success: false,
      message: 'Petición incorrecta. (Token inválido)'
    });;
  }
}

module.exports = { validateToken };

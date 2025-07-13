const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY_USER } = require("../config");

function userAuthMiddleware(req, res, next) {
  const token = req.headers.authentication;
  const decode = jwt.verify(token, JWT_SECRET_KEY_USER);
  if (decode) {
    const { id } = decode;
    req.userId = id;
    next();
  } else {
    return res.json({
      errorMess: " JWT TOKEN is not valid",
    });
  }
}

module.exports = {
  userAuthMiddleware,
};

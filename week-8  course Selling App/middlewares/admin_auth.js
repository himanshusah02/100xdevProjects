const jwt = require("jsonwebtoken");
const{JWT_SECRET_KEY_ADMIN} = require("../config");

function auth_admin(req, res, next) {
  const token = req.headers.authentication;
  const decoded = jwt.verify(token, JWT_SECRET_KEY_ADMIN);
  if (decoded) {
    req.adminId = decoded.id;
    next();
  } else {
    res.json({
      error: " You are not authenticate...",
    });
  }
}

module.exports = {
  auth_admin,
};

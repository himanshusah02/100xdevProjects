const jwt = require("jsonwebtoken");
const JWT_SECRET = "";
function auth(req, res, next) {
  let token = req.headers.token;
  //   console.log("token", token);

  let encodedInfo = jwt.verify(token, JWT_SECRET);

  if (encodedInfo) {
    req.userId = encodedInfo.id;
    next();
  } else {
    res.status(401).json({
      msg: "user not found........",
    });
  }
}

module.exports = {
    auth,
    JWT_SECRET
}

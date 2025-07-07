const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
var cors = require("cors");
const JWT_SECRET = "himan";

let users = [];

app.use(express.json());
app.use(cors());
function auth(err, req, res, next) {
  let token = req.headers.token;
  let encodedInfo = jwt.verify(token, JWT_SECRET);
  let username = encodedInfo.username;

  if (username) {
    req.username = username;
    next();
  } else {
    res.status(401).json({
      msg: "user not found........",
    });
  }
}

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

function logger(req, res, next) {
  console.log(req.method + " request came ");
  next();
}

app.post("/login", logger, function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  console.log(username, password);
  users.push({
    username: username,
    password: password,
  });

  res.send({
    msg: "Login successfully......",
  });
});

app.post("/signup", logger, function (req, res) {
  let userName = req.body.username;
  let Password = req.body.password;
  // console.log(userName, Password);
  let foundUser = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username == userName && users[i].password == Password) {
      foundUser = users[i];
    }
  }
  if (foundUser) {
    let token = jwt.sign(
      {
        username: userName, // what we are use to create token
      },
      JWT_SECRET
    ); // what key or secret to create a token
    // users.token = token;
    // console.log(token);
    res.header("jwt", token);
    res.json({
      token: token,
    });
  } else {
    res.json({
      msg: " user not found .....",
    });
  }
});

app.get("/me", logger, auth, function (req, res) {
  //  console.log(req);
  let userFound = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].token == req.token) {
      userFound = users[i];
      // console.log('user found ', userFound);
    }
  }

  if (userFound) {
    res.json({
      username: userFound.username,
      password: userFound.password,
    });
  } else {
    res.status(401).send({
      msg: "user not found",
    });
  }

  // if (userFound) {
  //   res.json({
  //     username: userFound.username,
  //     password: userFound.password,
  //   });
  // } else {
  //   res.status(401).send({
  //     msg: "user not found",
  //   });
  // }
});

app.listen(8080, () => {
  console.log("server started ......");
});

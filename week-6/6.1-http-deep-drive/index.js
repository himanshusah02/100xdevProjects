const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");


// let options = [
//   "a",
//   "b",
//   "c",
//   "d",
//   "e",
//   "f",
//   "g",
//   "h",
//   "i",
//   "j",
//   "k",
//   "l",
//   "m",
//   "n",
//   "o",
//   "p",
//   "q",
//   "r",
//   "s",
//   "t",
//   "u",
//   "v",
//   "w",
//   "x",
//   "y",
//   "z",
//   "A",
//   "B",
//   "C",
//   "D",
//   "E",
//   "F",
//   "G",
//   "H",
//   "I",
//   "J",
//   "K",
//   "L",
//   "M",
//   "N",
//   "O",
//   "P",
//   "Q",
//   "R",
//   "S",
//   "T",
//   "U",
//   "V",
//   "W",
//   "X",
//   "Y",
//   "Z",
//   "0",
//   "1",
//   "2",
//   "3",
//   "4",
//   "5",
//   "6",
//   "7",
//   "8",
//   "9",
// ];

// function generateToken() {
//   let token;
//   for (let i = 0; i < options.length; i++) {
//     let val = options[Math.floor(Math.random() * options.length)];
//     token += val;
//   }

//   return token;
// }

let users = [];

app.use(express.json());
app.post("/login", function (req, res) {
  let username = req.body.username;
  let password = req.body.password;

  users.push({
    username: username,
    password: password,
  });

  res.send({
    msg: "Login successfully......",
  });
});
app.post("/signup", function (req, res) {
  let userName = req.body.username;
  let Password = req.body.password;
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
    res.json({
      token: token,
    });
  } else {
    res.json({
      msg: " user not found .....",
    });
  }
});

app.post("/me", function (req, res) {
  let token = req.headers.token;
  let encodedInfo = jwt.verify(token, JWT_SECRET); // verify the user token to the , currect or not if currect that are send to the object

//   console.log(encodedInfo);
  let username = encodedInfo.username;
 
  let userFound = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username == username) {
      userFound = users[i];
    //   console.log(userFound);
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
});

app.listen(8080, () => {
  console.log("server started ......");
});

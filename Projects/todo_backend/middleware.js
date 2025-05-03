const express = require("express");

const app = express();
app.use(express.json());

// function isOldEnough(age) {
//   if (age >= 14) {
//     return true;
//   } else {
//     return false;
//   }
// }

function isOldEnoughMiddleware(req, res, next) {
  const age = req.query.age;
  if (age >= 14) {
    next();
  } else {
    res.json({
      msg: "age is not enough..",
    });
  }
}

app.post("/ride", isOldEnoughMiddleware, (req, res) => {
  let age = req.query.age;
  console.log(age);
  res.json({
    msg: "Your are succesfully enter....1",
  });
});

app.post("/ride2", isOldEnoughMiddleware, (req, res) => {
  res.json({
    msg: "Your are succesfully enter....2",
  });
});

app.listen(8080, () => {
  console.log("server start......");
});

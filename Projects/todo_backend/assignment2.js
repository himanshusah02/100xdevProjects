const express = require("express");

let app = express();
let numberOfRequestForUser = {};
setInterval(() => {
  numberOfRequestForUser = {};
}, 1000);

app.use(function (req, res, next) {
  const userId = req.header["user-id"];
  if (numberOfRequestForUser) {
    numberOfRequestForUser[userId] = numberOfRequestForUser[userId] + 1;
    if (numberOfRequestForUser[userId] > 5) {
      res.status(404).send("No entry");
    }
    else{
        next();
    }
  }else{
    numberOfRequestForUser[userId] = 1;
    next();
  }

});

app.get("/user", (req, res) => {

});

app.listen(8080, () => {
  console.log("server start");
});

const fs = require("fs");
const express = require("express");

const app = express();
app.use(express.json());
const users = [
  {
    name: "john",
    kidneys: [
      {
        healthy: false,
      },
      {
        healthy: true,
      },
    ],
  },
];

app.get("/", function (req, res) {
  const johnKidney = users[0].kidneys;
  console.log(johnKidney);
  const numberOfKideneys = johnKidney.length;
  console.log(numberOfKideneys);
  let numberOfHealthyKidneys = 0;

  for (let i = 0; i < johnKidney.length; i++) {
    if (johnKidney[i].healthy == true) {
      numberOfHealthyKidneys = numberOfHealthyKidneys + 1;
      console.log("the index is ", i);
    }
  }

  const numberofUnhealthyKedneys = numberOfKideneys - numberOfHealthyKidneys;
  res.json({
    numberOfKideneys,
    numberOfHealthyKidneys,
    numberofUnhealthyKedneys,
  });
});

app.post("/", function (req, res) {
  // console.log(req.body.isHealthy)
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });
  res.json({
    msg: "Done!",
  });
});

app.put("/", function (req, res) {
  for (i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
  }

  res.json({
    msg: "put res done",
  });
});

app.delete("/", function (req, res) {

  
  const newKidneys = [];
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (users[0].kidneys[i].healthy) {
      newKidneys.push({
        healthy: true,
      });
    }
  }

  users[0].kidneys = newKidneys;
  res.json({ msg: " done" });
});

app.listen(8080, () => {
  console.log("server start");
});

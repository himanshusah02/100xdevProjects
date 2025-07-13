const { Router } = require("express");

const courseRouter = Router();

courseRouter.get("/preview", (req, res) => {
  res.json({
    msg: "This is the Courses endpoint ",
  });
});
courseRouter.get("/purchase", (req, res) => {
  res.json({
    msg: "This is the purchase Course endpoint ",
  });
});

module.exports = {
  courseRouter,
};

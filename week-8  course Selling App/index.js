require("dotenv").config();
const port = process.env.PORT;


const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app = express();
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log("mongo connect successfully");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

app.listen(port, function () {
  console.log("server running on the port 8000");
});

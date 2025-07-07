
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { UserModel, TodoModel } = require("./db");
const { JWT_SECRET, auth } = require("./Auth");
const {z} = require("zod");



const app = express();
app.use(express.json());
mongoose.connect(
  ""
);

app.post("/singup", async function (req, res) {

const requiredBody = z.object({
  email:z.string().min(3).max(100).email(),
  name: z.string().min(3).max(100),
  password:z.string().min(3).max(30),
})

const parsedDataWithSuccess = requiredBody.safeParse(req.body);

if(!parsedDataWithSuccess.success){
  res.json({
    message:"incorrect format",
    error: parsedDataWithSuccess.error
  })
  return
}

  let email = req.body.email;
  let password = req.body.password;
  let name = req.body.name;

  let errorFound = false;
  try {
    const hashedPassword = await bcrypt.hash(password, 5);

    await UserModel.create({
      email: email,
      password: hashedPassword,
      name: name,
    });
  } catch (error) {
    res.json({
      msg: "Check your email ...",
    });
    errorFound = true;
  }
  if (!errorFound) {
    res.json({
      msg: "Login successfully......",
    });
  }
});

app.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({
    email: email,
  });

  if (!user) {
    res.status(403).json({
      msg: "user does not exit in our DATABASE ",
    });
    return;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_SECRET
    );
    res.json({ token: token });
  } else {
    res.status(403).json({
      msg: "wrong....",
    });
  }
});

app.post("/todo", auth, function (req, res) {
  const userId = req.userId;
  const title = req.body.title;
  const done = req.body.done;
  TodoModel.create({
    title,
    userId,
    done,
  });

  res.json({
    msg: "Todo created...",
  });
});

app.get("/todos", auth, async function (req, res) {
  const userId = req.userId;

  const todos = await TodoModel.find({
    userId: userId,
  });
  console.log(todos);

  res.json({
    msg: " fetch the todos",
  });
});

app.listen(8000, () => {
  console.log("server is running at port 8000");
});

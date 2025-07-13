const { Router } = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel, courseModel, purchaseModel } = require("../db");
const { userAuthMiddleware } = require("../middlewares/user_auth");

const userRouter = Router();
const{JWT_SECRET_KEY_USER} = require("../config");


userRouter.post("/signup", async (req, res) => {
  const requireData = zod.object({
    email: zod.string().min(5),
    password: zod.string().min(4),
    firstName: zod.string().min(4),
    lastName: zod.string().min(2),
  });

  const inputValidation = requireData.safeParse(req.body);

  if (!inputValidation.success) {
    res.json({
      msg: "Invalid input ..",
      error: inputValidation.error,
    });
  }
  const { email, password, firstName, lastName } = req.body;

  const parsePassword = await bcrypt.hash(password, 5);

  try {
    await userModel.create({
      email,
      password: parsePassword,
      firstName,
      lastName,
    });
  } catch (error) {
    return res.json({
      msg: " Error in inserting in Data Base",
    });
  }

  res.json({
    msg: " user login successfully ..",
  });
});

userRouter.post("/signin", async (req, res) => {
  const requireData = zod.object({
    email: zod.string().email(),
    password: zod.string().min(4),
  });
  const verifyData = requireData.safeParse(req.body);
  const { email, password } = req.body;

  const findUser = await userModel.findOne({
    email: email,
  });
  if (!findUser) {
    return res.json({
      msg: "this email user not find exit",
    });
  }

  const verifyPassword = bcrypt.compare(password, findUser.password);
  if (verifyPassword) {
    const token = jwt.sign({ id: findUser._id }, JWT_SECRET_KEY_USER);
    res.json({
      token: token,
    });
  } else {
    res.json({
      msg: "the password is incorrect ...",
    });
  }
});

userRouter.post("/purchase", userAuthMiddleware, async (req, res) => {
  const userId = req.userId;

  const purchases = await purchaseModel.find({
    courseId: userId,
  });

  const purchaseCourseIds = await purchases.map(
    (purchases) => purchases.courseId
  );

  const courseData = await courseModel.find({
    _id: { $in: purchaseCourseIds },
  });

  res.json({
    purchases,
    courseData,
  });
});

module.exports = {
  userRouter: userRouter,
};

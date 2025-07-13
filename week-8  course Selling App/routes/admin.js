const { Router } = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { adminModel, courseModel } = require("../db");
const bcrypt = require("bcrypt");
const { auth_admin } = require("../middlewares/admin_auth");
const{JWT_SECRET_KEY_ADMIN} = require("../config");

const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {
  const requireData = zod.object({
    email: zod.string().email(),
    firstName: zod.string().min(4),
    lastName: zod.string().min(3),
    password: zod.string().min(5),
  });
  const validData = requireData.safeParse(req.body);
  if (!validData.success) {
    return res.json({
      msg: "incomple formate ",
      error: validData.error,
    });
  }
  const { email, password, firstName, lastName } = req.body;
  const hashedPassword = await bcrypt.hash(password, 5);
  try {
    const user = await adminModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    return res.json({
      msg: "login successfully ",
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
});

adminRouter.post("/signin", async (req, res) => {
  const requireData = zod.object({
    email: zod.string().email(),
    password: zod.string().min(4),
  });

  const verifyData = requireData.safeParse(req.body);
  const { email, password } = req.body;

  const findUser = await adminModel.findOne({
    email: email,
  });
  if (!findUser) {
    return res.json({
      msg: "this email user not find exit",
    });
  }

  const verifyPassword = bcrypt.compare(password, findUser.password);
  if (verifyPassword) {
    const token = jwt.sign({ id: findUser._id }, JWT_SECRET_KEY_ADMIN);
    res.json({
      token: token,
    });
  } else {
    res.json({
      msg: "the password is incorrect ...",
    });
  }
});

// create
adminRouter.post("/course", auth_admin, async (req, res) => {
  const adminId = req.adminId;
  console.log(adminId);
  const requreData = zod.object({
    title: zod.string().min(4),
    discription: zod.string().min(10),
    price: zod.string().min(2),
    imageUrl: zod.string().min(4),
  });

  const validData = await requreData.safeParse(req.body);
  if (!validData.success) {
    return res.json({
      error: "please input valid data",
    });
  }
  const { title, discription, price, imageUrl } = req.body;

  const admin = await adminModel.findOne({
    _id: adminId,
  });

  try {
    if (admin) {
      await courseModel.create({
        title: title,
        discription: discription,
        price: price,
        imageUrl: imageUrl,
        creatorId: adminId,
      });
      res.json({
        msg: " create the course ..",
      });
    }
  } catch (error) {
    return res.json({
      error: error,
      msg: "DATA base not create  ",
    });
  }
});

// update the course
adminRouter.put("/course", auth_admin, async (req, res) => {
  const adminId = req.adminId;
  const requireData = zod.object({
    courseId: zod.string().min(4),
    title: zod.string().min(4),
    discription: zod.string().min(10),
    price: zod.string().min(2),
    imageUrl: zod.string().min(4),
  });

  const validData = requireData.safeParse(req.body);

  if (!validData.success) {
    res.json({
      error: validData.error,
    });
  }

  const { courseId, title, discription, price, imageUrl } = req.body;
  const course = await courseModel.findOne({
    _id: courseId,
    creatorId: adminId,
  });

  if (!course) {
    res.json({
      error: "course is not found",
    });
  } else {
    await courseModel.updateOne(
      { _id: courseId, creatorId: adminId },
      {
        title: title || course.title,
        discription: discription || course.discription,
        imageUrl: imageUrl || course.imageUrl,
        price: price || course.price,
      }
    );
  }
  res.json({
    msg: " course Update sucessfully",
  });
});

adminRouter.delete("/course", auth_admin, async (req, res) => {
  const adminId = req.adminId;
  const requireData = zod.object({
    courseId: zod.string().min(4),
  });

  const validData = requireData.safeParse(req.body);

  if (!validData.success) {
    res.json({
      error: validData.error,
    });
  }
  const { courseId } = req.body;

  const course = await courseModel.findOne({
    _id: courseId,
    creatorId: adminId,
  });

  if (!course) {
    return res.json({
      error: "course is not found",
    });
  } else {
    await courseModel.deleteOne({
      _id: course._id,
      creatorId: adminId,
    });
    return res.json({
      Msg: "The course id delete successfully ",
    });
  }

  res.json({
    msg: " the course is not found with this couseId",
  });
});

adminRouter.get("/course/bulk", auth_admin, async (req, res) => {
  const adminId = req.adminId;

  const courses = await courseModel.find({
    creatorId: adminId,
  });
  if (courses) {
    return res.json({
      courses: courses,
    });
  }else{
    res.json({
   msg: "No course yet "
  });
  }
});
module.exports = {
  adminRouter,
};

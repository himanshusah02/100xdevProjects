const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;



const userSchema = new Schema({
 
  password: String,
  email: { type: String, unique: true },
  firstName: String,
  lastName: String,
});

const adminSchema = new Schema({
  name: String,
  password: String,
  email: { type: String, unique: true },
  firstName: String,
  lastName: String,
});
const courseSchema = new Schema({
  title: String,
  discription: String,
  price: String,
  imageUrl: String,
  creatorId : ObjectId
});

const purchaseSchema = new Schema({
  courseId: ObjectId,
  userId: ObjectId,
});

const userModel = mongoose.model("users", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("courses", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel,
};

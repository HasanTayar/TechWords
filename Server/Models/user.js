const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  pass: { type: String },
  gender: {
    type: String,
    enum: ["male", "female"],
  
  },
  birthdate: { type: Date },
  Role:{type: String , default:"user"}
});
const Users = mongoose.model("Users", UserSchema);
module.exports = Users;

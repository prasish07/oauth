const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please give me your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter the email of the user"],
    unique: true,
    maxLength: [100, "Email cannot be more than 100 characters"],
  },
  password: {
    type: String,
    required: [true, "Please enter the password of the user"],
    minLength: [8, "Password cannot be less than 8 characters"],
  },
});

module.exports = mongoose.model("User", UserSchema);

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"], // Валидация email
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  isBlocked: {
    type: Boolean,
    default: false,
  },

  loginAttempts: {
    type: Number,
    default: 0,
  },

  lockUntil: {
    type: Date,
    default: null,
  },

  resetToken: String,
  resetTokenExpire: Date,

  //   resetPasswordToken: {
  //     type: String,
  //     default: null,
  //   },

  //   resetPasswordExpires: {
  //     type: Date,
  //     default: null,
  //   },
});

export default mongoose.model("User", UserSchema);

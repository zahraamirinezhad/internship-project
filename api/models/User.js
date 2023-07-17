const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    isTeacher: { type: Boolean, required: true, default: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    studentNumber: { type: Number, default: 0 },
    gender: { type: String, default: "other" },
    birthDate: { type: Date, default: "" },
    country: { type: String, default: "" },
    state: { type: String, default: "" },
    city: { type: String, default: "" },
    address: { type: String, default: "" },
    bio: { type: String, default: "" },
    profilePic: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

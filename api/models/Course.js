const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, default: "" },
    goal: { type: String, required: true, default: "" },
    abstract: { type: String, required: true, default: "" },
    avatar: { type: String, default: "" },
    creatorId: { type: String, required: true, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);

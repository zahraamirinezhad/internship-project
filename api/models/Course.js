const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    image: { type: String },
    levels: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);

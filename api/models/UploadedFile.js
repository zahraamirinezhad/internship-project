const mongoose = require("mongoose");

const UploadedFile = new mongoose.Schema(
  {
    fileName: { type: String, required: true, default: "", unique: true },
    type: { type: String, required: true, default: "" },
    path: { type: String, required: true, default: "" },
    courseId: { type: String, required: true, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UploadedFile", UploadedFile);

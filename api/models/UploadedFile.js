const mongoose = require("mongoose");

const UploadedFile = new mongoose.Schema(
  {
    type: { type: String, required: true, default: "" },
    path: { type: String, required: true, default: "" },
    fileName: { type: String, required: true, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UploadedFile", UploadedFile);

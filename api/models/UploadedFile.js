const Sequelize = require("sequelize");
const db = require("../database");

const UploadedFile = db.define(
  "UploadedFile",
  {
    fileName: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
      unique: true,
    },
    type: { type: Sequelize.STRING, allowNull: false, defaultValue: "" },
    path: { type: Sequelize.STRING, allowNull: false, defaultValue: "" },
    courseId: { type: Sequelize.STRING, allowNull: false, defaultValue: "" },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = UploadedFile;

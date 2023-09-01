const Sequelize = require("sequelize");
const db = require("../database");

const Student_WebCourse = db.define(
  "Student_WebCourse",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    score: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    html: { type: Sequelize.TEXT, allowNull: false, defaultValue: "" },
    css: { type: Sequelize.TEXT, allowNull: false, defaultValue: "" },
    javascript: { type: Sequelize.TEXT, allowNull: false, defaultValue: "" },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = Student_WebCourse;

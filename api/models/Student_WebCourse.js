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
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = Student_WebCourse;

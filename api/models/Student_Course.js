const Sequelize = require("sequelize");
const db = require("../database");

const Student_Course = db.define(
  "Student_Course",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = Student_Course;

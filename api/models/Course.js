const Sequelize = require("sequelize");
const db = require("../database");

const Course = db.define(
  "Course",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    goal: { type: Sequelize.STRING, allowNull: false, defaultValue: "" },
    abstract: { type: Sequelize.STRING, allowNull: false, defaultValue: "" },
    avatar: { type: Sequelize.STRING, defaultValue: null },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = Course;

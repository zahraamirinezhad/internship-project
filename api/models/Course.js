const Sequelize = require("sequelize");
const db = require("../database");

const Course = db.define(
  "Course",
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      defaultValue: "",
    },
    goal: { type: Sequelize.STRING, allowNull: false, defaultValue: "" },
    abstract: { type: Sequelize.STRING, allowNull: false, defaultValue: "" },
    avatar: { type: Sequelize.STRING, defaultValue: null },
    creatorId: { type: Sequelize.STRING, allowNull: false, defaultValue: "" },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = Course;

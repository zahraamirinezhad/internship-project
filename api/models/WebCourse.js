const Sequelize = require("sequelize");
const db = require("../database");

const WebCourse = db.define(
  "WebCourse",
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
    abstract: { type: Sequelize.STRING, allowNull: false, defaultValue: "" },
    html: { type: Sequelize.TEXT, allowNull: false, defaultValue: "" },
    css: { type: Sequelize.TEXT, allowNull: false, defaultValue: "" },
    javascript: { type: Sequelize.TEXT, allowNull: false, defaultValue: "" },
    isExam: { type: Sequelize.BOOLEAN, defaultValue: true, allowNull: false },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = WebCourse;

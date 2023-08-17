const Sequelize = require("sequelize");
const db = require("../database");

const Question = db.define(
  "Question",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    question: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    fullAnswer: { type: Sequelize.STRING, allowNull: false },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = Question;

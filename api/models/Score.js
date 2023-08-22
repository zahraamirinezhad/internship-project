const Sequelize = require("sequelize");
const db = require("../database");

const Score = db.define(
  "Score",
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
    courseFinished: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = Score;

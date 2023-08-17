const Sequelize = require("sequelize");
const db = require("../database");

const Level = db.define(
  "Level",
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
    score: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    courseFinished: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    doc: { type: Sequelize.STRING, allowNull: false, defaultValue: null },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null,
    },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = Level;

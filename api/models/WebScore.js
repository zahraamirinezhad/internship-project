const Sequelize = require("sequelize");
const db = require("../database");

const WebScore = db.define(
  "WebScore",
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
    js: { type: Sequelize.TEXT, allowNull: false, defaultValue: "" },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = WebScore;

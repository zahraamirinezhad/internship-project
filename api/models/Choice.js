const Sequelize = require("sequelize");
const db = require("../database");

const Choice = db.define(
  "Choice",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    choice: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
    },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = Choice;

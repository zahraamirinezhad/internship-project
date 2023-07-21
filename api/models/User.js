const Sequelize = require("sequelize");
const db = require("../database");

const User = db.define(
  "User",
  {
    username: { type: Sequelize.STRING, allowNull: false, unique: true },
    isTeacher: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    firstName: { type: Sequelize.STRING, defaultValue: "" },
    lastName: { type: Sequelize.STRING, defaultValue: "" },
    studentNumber: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    gender: { type: Sequelize.STRING, defaultValue: "other" },
    birthDate: { type: Sequelize.DATE },
    country: { type: Sequelize.STRING, defaultValue: "" },
    state: { type: Sequelize.STRING, defaultValue: "" },
    city: { type: Sequelize.STRING, defaultValue: "" },
    address: { type: Sequelize.STRING, defaultValue: "" },
    bio: { type: Sequelize.STRING, defaultValue: "" },
    profilePic: { type: Sequelize.STRING, defaultValue: null },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = User;

const Sequelize = require("sequelize");
const db = require("../database");

const Student = db.define(
  "Student",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    username: { type: Sequelize.STRING, allowNull: false, unique: true },
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

module.exports = Student;

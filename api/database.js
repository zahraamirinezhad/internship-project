const { Sequelize } = require("sequelize");

module.exports = new Sequelize("internship_project", "postgres", "sadistmode", {
  host: "localhost",
  dialect: "postgres",
});

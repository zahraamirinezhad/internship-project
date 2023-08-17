const express = require("express");
const db = require("./database");
const bodyParser = require("body-parser");
require("dotenv").config();
const authRoute = require("./routes/auth");
const teachersRoute = require("./routes/teachers");
const studentsRoute = require("./routes/students");
const coursesRoute = require("./routes/courses");
const compilerRoute = require("./routes/compiler");
const questionsRoute = require("./routes/questions");
const levelsRoute = require("./routes/levels");
const cors = require("cors");
const Sequelize = require("sequelize");
const Course = require("./models/Course");
const Teacher = require("./models/Teacher");
const Question = require("./models/Question");
const Choice = require("./models/Choice");
const Student = require("./models/Student");
const Level = require("./models/Level");
const Student_Course = require("./models/Student_Course");

const app = express();

db.authenticate()
  .then(() => {
    console.log("database connection successfull");
  })
  .catch((err) => {
    console.log("database connection unsuccessfull");
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoute);
app.use("/api/teachers", teachersRoute);
app.use("/api/students", studentsRoute);
app.use("/api/courses", coursesRoute);
app.use("/api/compile", compilerRoute);
app.use("/api/questions", questionsRoute);
app.use("/api/levels", levelsRoute);
app.use("/uploads", express.static("uploads"));

// Associations

//Every teacher created many courses
Teacher.hasMany(Course, {
  foreignKey: {
    type: Sequelize.UUID,
    allowNull: false,
  },
});
Course.belongsTo(Teacher);
// Every course has many levels
Course.hasMany(Level, {
  foreignKey: {
    type: Sequelize.UUID,
    allowNull: false,
  },
});
Level.belongsTo(Course);
//Every course has many questions
Level.hasMany(Question, {
  foreignKey: {
    type: Sequelize.UUID,
    allowNull: false,
  },
});
Question.belongsTo(Level);
//Every question has many choises
Question.hasMany(Choice, {
  foreignKey: {
    type: Sequelize.UUID,
    allowNull: false,
  },
});
Choice.belongsTo(Question);
//Every student has many courses
Student.hasMany(Student_Course, {
  foreignKey: {
    type: Sequelize.UUID,
    allowNull: false,
  },
});
Student_Course.belongsTo(Student);

Course.hasMany(Student_Course, {
  foreignKey: {
    type: Sequelize.UUID,
    allowNull: false,
  },
});
Student_Course.belongsTo(Course);

// db.sync({ force: true });

const port = process.env.PORT || 8800;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

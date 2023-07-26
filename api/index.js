const express = require("express");
const db = require("./database");
const bodyParser = require("body-parser");
require("dotenv").config();
const authRoute = require("./routes/auth");
const teachersRoute = require("./routes/teachers");
const studentsRoute = require("./routes/students");
const coursesRoute = require("./routes/courses");
const compilerRoute = require("./routes/compiler");
const uploadedFilesRoute = require("./routes/uploadedFiles");
const questionsRoute = require("./routes/questions");
const scoresRoute = require("./routes/scores");
const cors = require("cors");
const Sequelize = require("sequelize");
const Course = require("./models/Course");
const Teacher = require("./models/Teacher");
const UploadedFile = require("./models/UploadedFile");
const Question = require("./models/Question");
const Choice = require("./models/Choice");
const Score = require("./models/Score");
const Student = require("./models/Student");

const app = express();

db.authenticate()
  .then(() => {
    console.log("satabase connection successfull");
  })
  .catch((err) => {
    console.log("satabase connection unsuccessfull");
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
app.use("/api/uploadedFiles", uploadedFilesRoute);
app.use("/api/questions", questionsRoute);
app.use("/api/scores", scoresRoute);
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
//Every course has many docs
Course.hasMany(UploadedFile, {
  foreignKey: {
    type: Sequelize.UUID,
    allowNull: false,
  },
});
UploadedFile.belongsTo(Course);
//Every course has many questions
Course.hasMany(Question, {
  foreignKey: {
    type: Sequelize.UUID,
    allowNull: false,
  },
});
Question.belongsTo(Course);
//Every question has many choises
Question.hasMany(Choice, {
  foreignKey: {
    type: Sequelize.UUID,
    allowNull: false,
  },
});
Choice.belongsTo(Question);
//Every student has many courses
Course.hasMany(Score, {
  foreignKey: {
    type: Sequelize.UUID,
    allowNull: false,
  },
});
Score.belongsTo(Course);
Student.hasMany(Score, {
  foreignKey: {
    type: Sequelize.UUID,
    allowNull: false,
  },
});
Score.belongsTo(Student);

const port = process.env.PORT || 8800;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

const router = require("express").Router();
const Question = require("../models/Question");
const Level = require("../models/Level");
const Choice = require("../models/Choice");
const Score = require("../models/Score");
const Student = require("../models/Student");
const verify = require("../VerifyToken");
const multer = require("multer");
const path = require("path");

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: Storage,
}).single("avatar");

//CREATE COURSE
router.post("/addLevel/:id", verify, upload, async (req, res) => {
  console.log(req);

  try {
    const avatar = typeof req.file === "undefined" ? null : req.file.path;

    const level = await Level.create({
      title: req.body.title,
      doc: avatar,
      description: req.body.description,
      CourseId: req.params.id,
    });

    const questions = JSON.parse(req.body.questions);
    for (let i = 0; i < questions.length; i++) {
      const question = await Question.create({
        question: questions[i].question,
        fullAnswer: questions[i].fullAnswer,
        LevelId: level.id,
      });

      for (let j = 0; j < questions[i].choices.length; j++) {
        await Choice.create({
          choice: questions[i].choices[j].choice,
          QuestionId: question.id,
        });
      }
    }
    res.status(201).json("level added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/getLevelQuestions/:id", verify, async (req, res) => {
  try {
    const level = await Level.findOne({
      where: { id: req.params.id },
      include: Question,
    });

    const questionsRes = [];
    const questions = level.Questions;
    for (let i = 0; i < questions.length; i++) {
      const question = await Question.findOne({
        where: {
          id: questions[i].id,
        },
        include: Choice,
      });
      questionsRes.push(question);
    }
    res.status(200).json({ questions: questionsRes, courseId: level.CourseId });
  } catch (err) {
    res.status(500).json(err);
  }
});

//SET SCORE
router.post("/setScore/:levelId", verify, async (req, res) => {
  await Score.create({
    StudentId: req.user.id,
    LevelId: req.params.levelId,
    score: req.body.score,
    courseFinished: true,
  })
    .then((score) => {
      // console.log(course);
      res.status(201).json(`your score is ${score.score}`);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/getStudents/:levelId", verify, async (req, res) => {
  try {
    const studentsId = await Score.findAll({
      where: {
        LevelId: req.params.levelId,
      },
    });

    const students = [];
    for (let i = 0; i < studentsId.length; i++) {
      const student = await Student.findOne({
        where: {
          id: studentsId[i].StudentId,
        },
      });
      students.push(student);
    }

    res.status(200).json(students);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //DELETE COURSE
// router.delete("/:id", verify, async (req, res) => {
//   try {
//     await Course.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });

//     res.status(200).json("Course deleted successfully :)");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;

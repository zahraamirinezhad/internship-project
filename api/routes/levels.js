const router = require("express").Router();
const Question = require("../models/Question");
const Level = require("../models/Level");
const Choice = require("../models/Choice");
const verify = require("../VerifyToken");
const multer = require("multer");
const path = require("path");
const { where } = require("sequelize");

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
    res.status(200).json(questionsRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/", async (req, res) => {
//   try {
//     const courses = await Course.findAll();
//     res.status(200).json(courses);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/getCourseDocs/:id", verify, async (req, res) => {
//   try {
//     const courses = await Course.findOne({
//       where: {
//         id: req.params.id,
//       },
//       include: UploadedFile,
//     });
//     res.status(200).json(courses);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/getCourseQuestions/:id", verify, async (req, res) => {
//   try {
//     const courses = await Course.findOne({
//       where: {
//         id: req.params.id,
//       },
//       include: Question,
//     });
//     res.status(200).json(courses);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/getCourseQuestionsChoices/:id", verify, async (req, res) => {
//   try {
//     const question = await Question.findOne({
//       where: {
//         id: req.params.id,
//       },
//       include: Choice,
//     });
//     res.status(200).json(question);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.put("/editCourse/:id", verify, upload, async (req, res) => {
//   // console.log(req);
//   try {
//     const avatar =
//       typeof req.file === "undefined" ? req.body.avatar : req.file.path;
//     const course = await Course.update(
//       {
//         title: req.body.title,
//         goal: req.body.goal,
//         abstract: req.body.abstract,
//         avatar: avatar,
//       },
//       {
//         where: {
//           id: req.params.id,
//         },
//       }
//     );
//     res.status(200).json(course);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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

// router.get("/getStudents/:courseId", verify, async (req, res) => {
//   try {
//     const scores = await Course.findOne({
//       where: {
//         id: req.params.courseId,
//       },
//       include: Score,
//     });

//     const students = [];
//     for (let i = 0; i < scores.Scores.length; i++) {
//       const student = await Score.findOne({
//         where: {
//           id: scores.Scores[i].id,
//         },
//         include: Student,
//       });
//       students.push(student.Student);
//     }

//     res.status(200).json(students);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;

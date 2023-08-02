const router = require("express").Router();
const Question = require("../models/Question");
const UploadedFile = require("../models/UploadedFile");
const Course = require("../models/Course");
const Choice = require("../models/Choice");
const Score = require("../models/Score");
const verify = require("../VerifyToken");
const multer = require("multer");
const path = require("path");
const Student = require("../models/Student");

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
router.post("/create", verify, upload, async (req, res) => {
  // await Course.sync({ force: true });

  const avatar = typeof req.file === "undefined" ? null : req.file.path;
  await Course.create({
    title: req.body.title,
    goal: req.body.goal,
    abstract: req.body.abstract,
    avatar: avatar,
    TeacherId: req.user.id,
  })
    .then((course) => {
      console.log(course);
      res.status(201).json(course);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/", async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getCourseDocs/:id", verify, async (req, res) => {
  try {
    const courses = await Course.findOne({
      where: {
        id: req.params.id,
      },
      include: UploadedFile,
    });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getCourseQuestions/:id", verify, async (req, res) => {
  try {
    const courses = await Course.findOne({
      where: {
        id: req.params.id,
      },
      include: Question,
    });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getCourseQuestionsChoices/:id", verify, async (req, res) => {
  try {
    const question = await Question.findOne({
      where: {
        id: req.params.id,
      },
      include: Choice,
    });
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/editCourse/:id", verify, upload, async (req, res) => {
  // console.log(req);
  try {
    const avatar =
      typeof req.file === "undefined" ? req.body.avatar : req.file.path;
    const course = await Course.update(
      {
        title: req.body.title,
        goal: req.body.goal,
        abstract: req.body.abstract,
        avatar: avatar,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE COURSE
router.delete("/:id", verify, async (req, res) => {
  try {
    await Course.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json("Course deleted successfully :)");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getStudents/:courseId", verify, async (req, res) => {
  try {
    const scores = await Course.findOne({
      where: {
        id: req.params.courseId,
      },
      include: Score,
    });

    const students = [];
    for (let i = 0; i < scores.Scores.length; i++) {
      const student = await Score.findOne({
        where: {
          id: scores.Scores[i].id,
        },
        include: Student,
      });
      students.push(student.Student);
    }

    res.status(200).json(students);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

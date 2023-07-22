const router = require("express").Router();
const Course = require("../models/Course");
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

router.get("/", verify, async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

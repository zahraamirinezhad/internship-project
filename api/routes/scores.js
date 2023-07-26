const router = require("express").Router();
const Score = require("../models/Score");
const verify = require("../VerifyToken");

//CREATE COURSE
router.post("/takeCourse/:id", verify, async (req, res) => {
  await Score.sync({ force: true });

  await Score.create({
    score: 0,
    lastQuestion: 0,
    courseFinished: false,
    StudentId: req.user.id,
    CourseId: req.params.id,
  })
    .then((score) => {
      console.log(score);
      res.status(201).json(score);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/getMyCourses", verify, async (req, res) => {
  try {
    const courses = await Score.findAll({
      where: {
        StudentId: req.user.id,
      },
    });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/logOut/:id", verify, async (req, res) => {
  try {
    await Score.destroy({
      where: {
        StudentId: req.user.id,
        CourseId: req.params.id,
      },
    });
    res.status(200).json("log out successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/isTaken/:id", verify, async (req, res) => {
  try {
    const courses = await Score.findAll({
      where: {
        StudentId: req.user.id,
      },
    });

    let courseTaken = false;
    courses.forEach((element) => {
      console.log(element);
      if (element.CourseId === req.params.id) {
        courseTaken = true;
      }
    });
    res.status(200).json(courseTaken);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

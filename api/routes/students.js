const router = require("express").Router();
const Student = require("../models/Student");
const verify = require("../VerifyToken");
const multer = require("multer");
const path = require("path");
const Course = require("../models/Course");
const Student_Course = require("../models/Student_Course");
const Student_WebCourse = require("../models/Student_WebCourse");
const WebCourse = require("../models/WebCourse");

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

//UPDATE
router.put("/update", verify, upload, async (req, res) => {
  console.log(req);
  try {
    const avatar = typeof req.file === "undefined" ? null : req.file.path;

    await Student.update(
      {
        username: req.body.username,
        isTeacher: req.body.isTeacher,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        studentNumber: req.body.studentNumber,
        gender: req.body.gender,
        birthDate: req.body.birthDate,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        address: req.body.address,
        bio: req.body.bio,
        profilePic: avatar,
      },
      {
        where: { id: req.user.id },
      }
    );

    res.status(200).json("user edited successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await Student.findByIdAndDelete(req.params.id);

      res.status(200).json("User deleted successfully :)");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can only delete your account !!");
  }
});

//GET USER
router.get("/find", verify, async (req, res) => {
  try {
    const user = await Student.findOne({
      where: {
        id: req.user.id,
      },
    });
    const {
      username,
      isTeacher,
      email,
      firstName,
      lastName,
      studentNumber,
      gender,
      birthDate,
      country,
      state,
      city,
      address,
      bio,
      profilePic,
    } = user;

    res.status(200).json({
      username,
      isTeacher,
      email,
      firstName,
      lastName,
      studentNumber,
      gender,
      birthDate,
      country,
      state,
      city,
      address,
      bio,
      profilePic,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER STATUS
router.get("/status", verify, async (req, res) => {
  try {
    const user = await Student.findOne({
      where: {
        id: req.user.id,
      },
    });
    const status = user.isTeacher;
    res.status(200).json({ isTeacher: status });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET COURSE STAT
router.get("/isCourseTaken/:courseId", verify, async (req, res) => {
  try {
    const course = await Student_Course.findOne({
      where: {
        StudentId: req.user.id,
        CourseId: req.params.courseId,
      },
    });
    const isTaken = course === null ? false : true;
    res.status(200).json(isTaken);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET COURSE STAT
router.get("/isWebCourseTaken/:courseId", verify, async (req, res) => {
  try {
    const course = await Student_WebCourse.findOne({
      where: {
        StudentId: req.user.id,
        WebCourseId: req.params.courseId,
      },
    });
    const isTaken = course === null ? false : true;
    res.status(200).json(isTaken);
  } catch (err) {
    res.status(500).json(err);
  }
});

//TAKE COURSE
router.post("/takeCourse", verify, async (req, res) => {
  await Student_Course.create({
    StudentId: req.user.id,
    CourseId: req.body.courseId,
  })
    .then(() => {
      // console.log(course);
      res.status(201).json("you got the course.");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//TAKE WEB COURSE
router.post("/takeWebCourse", verify, async (req, res) => {
  await Student_WebCourse.create({
    StudentId: req.user.id,
    WebCourseId: req.body.courseId,
  })
    .then(() => {
      // console.log(course);
      res.status(201).json("you got the course.");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//LOG OUT COURSE
router.delete("/logOut/:id", verify, async (req, res) => {
  await Student_Course.destroy({
    where: {
      StudentId: req.user.id,
      CourseId: req.params.id,
    },
  })
    .then(() => {
      // console.log(course);
      res.status(201).json("you lost the course.");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/logOutWeb/:id", verify, async (req, res) => {
  await Student_WebCourse.destroy({
    where: {
      StudentId: req.user.id,
      WebCourseId: req.params.id,
    },
  })
    .then(() => {
      // console.log(course);
      res.status(201).json("you lost the course.");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/getTakenExams", verify, async (req, res) => {
  try {
    const coursesId = await Student_Course.findAll({
      where: {
        StudentId: req.user.id,
      },
    });

    const courses = [];
    for (let i = 0; i < coursesId.length; i++) {
      const course = await Course.findOne({
        where: {
          id: coursesId[i].CourseId,
          isExam: true,
        },
      });
      courses.push(course);
    }

    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getTakenPractices", verify, async (req, res) => {
  try {
    const coursesId = await Student_Course.findAll({
      where: {
        StudentId: req.user.id,
      },
    });

    const courses = [];
    for (let i = 0; i < coursesId.length; i++) {
      const course = await Course.findOne({
        where: {
          id: coursesId[i].CourseId,
          isExam: false,
        },
      });
      courses.push(course);
    }

    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getTakenWebExams", verify, async (req, res) => {
  try {
    const coursesId = await Student_WebCourse.findAll({
      where: {
        StudentId: req.user.id,
      },
    });

    const courses = [];
    for (let i = 0; i < coursesId.length; i++) {
      const course = await WebCourse.findOne({
        where: {
          id: coursesId[i].WebCourseId,
          isExam: true,
        },
      });
      courses.push(course);
    }

    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getTakenWebPractices", verify, async (req, res) => {
  try {
    const coursesId = await Student_WebCourse.findAll({
      where: {
        StudentId: req.user.id,
      },
    });

    const courses = [];
    for (let i = 0; i < coursesId.length; i++) {
      const course = await WebCourse.findOne({
        where: {
          id: coursesId[i].WebCourseId,
          isExam: false,
        },
      });
      courses.push(course);
    }

    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET SCORE
router.post("/getWebExamAnswer", verify, async (req, res) => {
  try {
    const course = await Student_WebCourse.findOne({
      where: {
        StudentId: req.body.studentId,
        WebCourseId: req.body.courseId,
      },
      include: Student,
    });

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

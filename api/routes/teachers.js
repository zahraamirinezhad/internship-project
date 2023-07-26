const router = require("express").Router();
const Teacher = require("../models/Teacher");
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

//UPDATE
router.put("/update", verify, upload, async (req, res) => {
  console.log(req);
  try {
    const avatar = typeof req.file === "undefined" ? null : req.file.path;

    await Teacher.update(
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
      await Teacher.findByIdAndDelete(req.params.id);

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
  // console.log(req);
  try {
    const user = await Teacher.findOne({
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

router.get("/getAllCourses", verify, async (req, res) => {
  try {
    res.status(201).json("courses");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

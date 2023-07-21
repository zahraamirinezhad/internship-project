const router = require("express").Router();
const User = require("../models/User");
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
    // const updatedUser = await User.findByIdAndUpdate(
    //   req.user.id,
    //   {
    //     $set: req.body,
    //     profilePic: req.file.path,
    //   },
    //   { new: true }
    // );

    const avatar = typeof req.file === "undefined" ? null : req.file.path;

    await User.update(
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
      await User.findByIdAndDelete(req.params.id);

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
    const user = await User.findOne({
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
    const user = await User.findOne({
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

//GET ALL USERS
router.get("/", verify, async (req, res) => {
  const query = req.query.new;

  if (req.user.isAdmin) {
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to see all users !!");
  }
});

//GET USER STAT
router.get("/stats", async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getAllCourses", verify, async (req, res) => {
  try {
    const course = User.findById(req.user.id);
    const courses = await User.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "creatorId",
          foreignField: "_id",
          as: "usersCourses",
        },
      },
    ]);
    console.log("courses");
    console.log(courses);
    // res.status(201).json(course);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

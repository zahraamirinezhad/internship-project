const router = require("express").Router();
const Course = require("../models/Course");
const UploadedFile = require("../models/UploadedFile");
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
  console.log(req);
  const newCourse = new Course({
    title: req.body.title,
    goal: req.body.goal,
    abstract: req.body.abstract,
    avatar: req.file.path,
    docs: [],
    levels: [],
  });

  try {
    const course = await newCourse.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json(err);
  }
});

//ADD DOCUMENT TO COURSE
router.post("/addDoc/:id", verify, upload, async (req, res) => {
  console.log(req);

  try {
    const newFile = new UploadedFile({
      type: req.file.mimetype,
      path: req.file.path,
      fileName: req.file.filename,
    });
    const file = await newFile.save();
    console.log("file");
    console.log(file);
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          docs: {
            fileId: file._id.toString(),
            fileName: file.fileName,
            path: file.path,
          },
        },
      },
      { upsert: true, new: true }
    );
    res.status(201).json(updatedCourse);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE ATTACHMENT
router.delete("/attachment/:id/:fileId", verify, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    const docList = course.docs;
    const newList = docList.filter((x) => x.fileId !== req.params.fileId);
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        docs: newList,
      },
      { new: true }
    );
    res.status(201).json(updatedCourse);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

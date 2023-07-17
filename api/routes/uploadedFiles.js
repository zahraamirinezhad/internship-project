const router = require("express").Router();
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

//ADD DOCUMENT TO COURSE
router.post("/addDoc/:id", verify, upload, async (req, res) => {
  console.log(req);

  try {
    const newFile = new UploadedFile({
      type: req.file.mimetype,
      path: req.file.path,
      fileName: req.file.filename,
      courseId: req.params.id,
    });
    const file = await newFile.save();
    res.status(201).json(file);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET FILES OF SPECIAL COURSE
// router.delete("/:id", verify, async (req, res) => {
//   try {
//     await UploadedFile.findByIdAndDelete(req.params.id);

//     res.status(200).json("File deleted successfully :)");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//DELETE FILE
router.delete("/:id", verify, async (req, res) => {
  try {
    await UploadedFile.findByIdAndDelete(req.params.id);

    res.status(200).json("File deleted successfully :)");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const router = require("express").Router();
const UploadedFile = require("../models/UploadedFile");
const verify = require("../VerifyToken");

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

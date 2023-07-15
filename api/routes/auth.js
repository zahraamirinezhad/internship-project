const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    isTeacher: req.body.isTeacher,
    studentNumber: req.body.studentNumber,
    birthDate: req.body.userBirthDate,
    gender: req.body.gender,
    bio: req.body.bio,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
    address: req.body.address,
  });

  try {
    const user = await newUser.save();
    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "5d",
    });
    res.status(201).json({ accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  console.log(req);
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong Password or Username !!!");

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json("Wrong Password or Username !!!");
    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "5d",
    });
    const { password, ...info } = user._doc;

    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  await User.create({
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
  })
    .then((user) => {
      console.log(user);
      const accessToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: "5d",
      });
      res.status(201).json({ accessToken });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//LOGIN
router.post("/login", async (req, res) => {
  console.log(req);
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    !user && res.status(401).json("Wrong Password or Username !!!");

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json("Wrong Password or Username !!!");
    const accessToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "5d",
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

    res
      .status(200)
      .json({
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
        accessToken,
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

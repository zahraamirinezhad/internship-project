const router = require("express").Router();
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  console.log(req);

  if (req.body.isTeacher) {
    // await Teacher.sync({ force: true });

    await Teacher.create({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
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
  } else {
    // await Student.sync({ force: true });
    await Student.create({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
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
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  console.log(req);
  try {
    if (req.body.isTeacher) {
      const user = await Teacher.findOne({
        where: {
          email: req.body.email,
        },
      });
      !user && res.status(401).json("Wrong Data !!!");

      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

      originalPassword !== req.body.password &&
        res.status(401).json("Wrong Data !!!");
      const accessToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: "5d",
      });

      res.status(200).json({
        accessToken,
      });
    } else {
      const user = await Student.findOne({
        where: {
          email: req.body.email,
        },
      });
      !user && res.status(401).json("Wrong Password or Username !!!");

      console.log("user");
      console.log(user);

      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

      originalPassword !== req.body.password &&
        res.status(401).json("Wrong Password or Username !!!");
      const accessToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: "5d",
      });

      res.status(200).json({
        accessToken,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

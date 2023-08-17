const router = require("express").Router();
const Question = require("../models/Question");
const Choice = require("../models/Choice");
const verify = require("../VerifyToken");

//ADD DOCUMENT TO COURSE
router.post("/addQuestion/:id", verify, async (req, res) => {
  try {
    console.log(req);
    console.log(req.body.choices);

    //   await Question.sync({ force: true });
    //   await Choice.sync({ force: true });

    const question = await Question.create({
      question: req.body.question,
      fullAnswer: req.body.fullAnswer,
      LevelId: req.params.id,
    });

    for (let i = 0; i < req.body.choices.length; i++) {
      console.log(req.body.choices[i]);
      await Choice.create({
        choice: req.body.choices[i].choice,
        QuestionId: question.id,
      });
    }

    res.status(201).json("question added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.delete("/deleteCourseQuestions/:id", verify, async (req, res) => {
//   try {
//     await Question.destroy({
//       where: {
//         LevelId: req.params.id,
//       },
//     });
//     res.status(200).json("questions deleted successfully !!");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;

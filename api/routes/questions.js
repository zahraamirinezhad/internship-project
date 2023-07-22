const router = require("express").Router();
const Question = require("../models/Question");
const Choice = require("../models/Choice");
const verify = require("../VerifyToken");

//ADD DOCUMENT TO COURSE
router.post("/addQuestion/:id", verify, async (req, res) => {
  console.log(req);
  console.log(req.body.choices);

  //   await Question.sync({ force: true });
  //   await Choice.sync({ force: true });

  const question = await Question.create({
    question: req.body.question,
    fullAnswer: req.body.fullAnswer,
    CourseId: req.params.id,
  });

  console.log("question");
  console.log(question);
  console.log(question.id);

  for (let i = 0; i < req.body.choices.length; i++) {
    console.log(req.body.choices[i]);
    await Choice.create({
      choice: req.body.choices[i].choice,
      QuestionId: question.id,
    });
  }
});

module.exports = router;

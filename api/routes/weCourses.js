const router = require("express").Router();
const WebCourse = require("../models/WebCourse");
const verify = require("../VerifyToken");
const Student = require("../models/Student");
const Student_WebCourse = require("../models/Student_WebCourse");
const HtmlDiffer = require("html-differ").HtmlDiffer;
const logger = require("html-differ/lib/logger");
const fs = require("fs");
const compare = require("dom-compare").compare;
const jsdom = require("jsdom");
const reporter = require("dom-compare").GroupingReporter;
const { JSDOM } = jsdom;

//CREATE COURSE
router.post("/create", verify, async (req, res) => {
  // await Course.sync({ force: true });

  console.log(req);

  await WebCourse.create({
    title: req.body.title,
    abstract: req.body.abstract,
    html: req.body.html,
    css: req.body.css,
    javascript: req.body.javascript,
    isExam: req.body.isExam,
    TeacherId: req.user.id,
  })
    .then((course) => {
      // console.log(course);
      res.status(201).json(course);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/", async (req, res) => {
  try {
    const courses = await WebCourse.findAll();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getExams", async (req, res) => {
  try {
    const courses = await WebCourse.findAll({
      where: {
        isExam: true,
      },
    });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getPractices", async (req, res) => {
  try {
    const courses = await WebCourse.findAll({
      where: {
        isExam: false,
      },
    });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getCourse/:id", async (req, res) => {
  try {
    const courses = await WebCourse.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/check/:id", async (req, res) => {
  try {
    // const html1 = fs.readFileSync(
    //   "D:\\science\\intership\\internship-project\\api\\routes\\one.html",
    //   "utf-8"
    // );
    // const html2 = fs.readFileSync(
    //   "D:\\science\\intership\\internship-project\\api\\routes\\two.html",
    //   "utf-8"
    // );

    var options = {
      ignoreAttributes: [],
      compareAttributesAsJSON: [],
      ignoreWhitespaces: true,
      ignoreComments: true,
      ignoreEndTags: true,
      ignoreDuplicateAttributes: false,
    };

    var htmlDiffer = new HtmlDiffer(options);

    var diff = htmlDiffer.diffHtml(req.body.question, req.body.answer),
      isEqual = htmlDiffer.isEqual(req.body.question, req.body.answer),
      result = logger.getDiffText(diff, { charsAroundDiff: 40 });

    res.status(200).json({ diff: diff, isEqual: isEqual, result: result });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

  console.log(req);
  // try {
  //   // Those are the HTML fragments that we want to compare:
  //   var expectedHTML = req.body.question;
  //   var actualHTML = req.body.answer;

  //   var expectedDOM = new JSDOM(expectedHTML).window.document;
  //   var actualDOM = new JSDOM(actualHTML).window.document;

  //   var options = {
  //     stripSpaces: true,
  //     compareComments: true,
  //     collapseSpaces: true,
  //     normalizeNewlines: true,
  //   };

  //   var result = compare(expectedDOM, actualDOM, options);

  //   console.log("diff array:", result.getDifferences());

  //   // we can use a reporter to pretty-print the result:

  //   console.log(reporter.report(result));

  //   res.status(200).json({
  //     report: reporter.report(result),
  //     result: result.getResult(),
  //   });
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json(err);
  // }

  // try {
  //   // const result =
  //   //   generateHashCode(req.body.question) === generateHashCode(req.body.answer);

  //   var expectedHTML = req.body.question;
  //   var actualHTML = req.body.answer;
  //   const result = expectedHTML.hashCode() === actualHTML.hashCode();
  //   res.status(200).json(result);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json(err);
  // }
});

// router.delete("/editCourse/deleteLevels/:id", verify, async (req, res) => {
//   try {
//     await Level.destroy({
//       where: {
//         CourseId: req.params.id,
//       },
//     });
//     res.status(200).json("Levels deleted successfully :)");
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.put("/editWebCourse/:id", verify, async (req, res) => {
  // console.log(req);
  try {
    const course = await WebCourse.update(
      {
        title: req.body.title,
        abstract: req.body.abstract,
        html: req.body.html,
        css: req.body.css,
        javascript: req.body.javascript,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE COURSE
router.delete("/:id", verify, async (req, res) => {
  try {
    await WebCourse.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json("Course deleted successfully :)");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getStudents/:courseId", verify, async (req, res) => {
  try {
    const studentsId = await Student_WebCourse.findAll({
      where: {
        WebCourseId: req.params.courseId,
      },
    });

    const students = [];
    for (let i = 0; i < studentsId.length; i++) {
      const student = await Student.findOne({
        where: {
          id: studentsId[i].StudentId,
        },
      });
      students.push(student);
    }

    res.status(200).json(students);
  } catch (err) {
    res.status(500).json(err);
  }
});

const generateHashCode = (input) => {
  var hashValue = 0;
  var i, code;
  for (i = 0; i < input.length; i++) {
    // Returns the unicode of first character
    code = input.charCodeAt(i);
    hashValue = (hashValue << 5) - hashValue + code;
    hashValue |= 0;
  }
  return hashValue;
};

String.prototype.hashCode = function () {
  var hash = 0,
    i,
    chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

module.exports = router;

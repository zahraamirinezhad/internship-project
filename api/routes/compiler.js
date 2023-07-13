const router = require("express").Router();
const verify = require("../VerifyToken");
const fs = require("fs");
const exec = require("child_process").exec;

router.post("/compileCode", verify, (req, res) => {
  //   console.log(req);
  console.log(req.body.language);
  console.log(req.body.code);

  const code = req.body.code;
  const lan = req.body.language;

  fs.writeFile(`./code/temp-code.${lan}`, code, function (err) {
    if (err) console.log("error", err);
    else {
      console.log("Saved!");
      if (lan === "py") {
        compilePythonCode(lan, res);
      }

      if (lan === "js") {
        compileNodeCode(lan, res);
      }
    }
  });
});

const compilePythonCode = (lan, res) => {
  exec(`python ./code/temp-code.${lan}`, function (error, stdout, stderr) {
    console.log("stdout: " + stdout);
    console.log("stderr: " + stderr);
    fs.unlink(`./code/temp-code.${lan}`, function (err) {
      if (err) throw err;
      else console.log("File deleted!");
    });

    if (stdout !== "") {
      res.status(200).json({ errorHappened: false, result: stdout });
    }
    if (stderr !== "") {
      res.status(200).json({ errorHappened: true, result: stderr });
    }
    if (error !== null) {
      console.log("exec error: " + error);
      // res.status(403).json(error);
    }
  });
};

const compileNodeCode = (lan, res) => {
  exec(`node ./code/temp-code.${lan}`, function (error, stdout, stderr) {
    console.log("stdout: " + stdout);
    console.log("stderr: " + stderr);
    fs.unlink(`./code/temp-code.${lan}`, function (err) {
      if (err) throw err;
      console.log("File deleted!");
    });

    if (stdout !== "") {
      res.status(200).json(stdout);
    }
    if (stderr !== "") {
      res.status(403).json(stderr);
    }
    if (error !== null) {
      console.log("exec error: " + error);
      // res.status(403).json(error);
    }
  });
};

module.exports = router;

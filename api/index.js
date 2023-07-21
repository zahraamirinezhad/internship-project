const express = require("express");
const db = require("./database");
const bodyParser = require("body-parser");
require("dotenv").config();
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const coursesRoute = require("./routes/courses");
const compilerRoute = require("./routes/compiler");
const uploadedFilesRoute = require("./routes/uploadedFiles");
const cors = require("cors");

const app = express();

db.authenticate()
  .then(() => {
    console.log("satabase connection successfull");
  })
  .catch((err) => {
    console.log("satabase connection unsuccessfull");
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/courses", coursesRoute);
app.use("/api/compile", compilerRoute);
app.use("/api/uploadedFiles", uploadedFilesRoute);
app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 8800;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

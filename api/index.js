const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const compilerRoute = require("./routes/compiler");
const cors = require("cors");

const app = express();

mongoose
  .connect(process.env.DATABASE)
  .then((con) => {
    console.log("successful");
    console.log(con.connections);
  })
  .catch((err) => {
    console.log("error");
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/compile", compilerRoute);
app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 8800;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

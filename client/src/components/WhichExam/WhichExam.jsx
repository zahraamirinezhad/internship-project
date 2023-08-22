import React from "react";
import classes from "./WhichExam.module.scss";
import { Link } from "react-router-dom";

const WhichExam = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.html}>HTML</h1>
      <h1 className={classes.css}>CSS</h1>
      <h1 className={classes.javascript}>JAVASCRIPT</h1>
      <h1 className={classes.nodejs}>NODE.JS</h1>
      <h1 className={classes.python}>PYTHON</h1>
      <h1 className={classes.c}>C</h1>
      <h1 className={classes.cpp}>C++</h1>
      <h1 className={classes.php}>PHP</h1>
      <div className={classes.options}>
        <Link
          className={classes.languageOptions}
          to="/profileStructure/createCourse"
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Create Other Languages Exam ?
        </Link>
        <Link
          className={classes.languageOptions}
          to="/profileStructure/createWebCourse"
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Create Web Languages Exam ?
        </Link>
      </div>
    </div>
  );
};

export default WhichExam;

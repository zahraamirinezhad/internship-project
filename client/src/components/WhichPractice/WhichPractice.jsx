import React from "react";
import classes from "./WhichPractice.module.scss";
import { Link } from "react-router-dom";

const WhichPractice = () => {
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
          to="/profileStructure/createPractice"
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Create Other Languages Practice ?
        </Link>
        <Link
          className={classes.languageOptions}
          to="/profileStructure/createWebPractice"
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Create Web Languages Practice ?
        </Link>
      </div>
    </div>
  );
};

export default WhichPractice;

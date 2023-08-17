import React from "react";
import classes from "./Practice.module.scss";
import { Link } from "react-router-dom";

const Practice = () => {
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
        <Link className={classes.languageOptions} to="/webLan">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          HTML, CSS and JAVASCRIPT
        </Link>
        <Link className={classes.languageOptions} to="/otherLan">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Other Languages
        </Link>
      </div>
    </div>
  );
};

export default Practice;

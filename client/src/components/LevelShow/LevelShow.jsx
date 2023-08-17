import React from "react";
import classes from "./LevelShow.module.scss";
import { Link } from "react-router-dom";

const LevelShow = ({ id, title, doc, desc }) => {
  return (
    <Link to={`/takeCourse/${id}`} className={classes.container}>
      <div className={classes.levelInfo}>
        <div className={classes.levelTitle}>{title}</div>
        <div>
          <p className={classes.levelDesc}>{desc}</p>
        </div>
      </div>
      <img
        className={classes.levelImage}
        src={`http://localhost:8800/${doc}`}
        alt="level_Image"
      />
    </Link>
  );
};

export default LevelShow;

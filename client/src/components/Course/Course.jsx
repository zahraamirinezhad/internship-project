import React from "react";
import classes from "./Course.module.scss";
import { Edit, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Course = ({
  type,
  id,
  token,
  title,
  avatar,
  goal,
  abstract,
  isTeacher,
}) => {
  return (
    <Link className={classes.container} to={`/showCourse/${id}`}>
      <div className={classes.courseInfo}>
        <div className={classes.courseTitle}>
          <h1 className={classes.title}>{title}</h1>
          {type === "MyCourses" && isTeacher && (
            <Link
              className={`${classes.options} ${classes.editCourse}`}
              to={`/editCourse/${id}`}
            >
              <Edit />
              Edit
            </Link>
          )}
          {type === "MyCourses" && (
            <button className={`${classes.options} ${classes.deleteCourse}`}>
              <Delete />
              Delete
            </button>
          )}
        </div>
        <div className={classes.courseGoal}>
          <p>{goal}</p>
        </div>
        <div>
          <p className={classes.courseDesc}>{abstract}</p>
        </div>
      </div>
      <img
        className={classes.courseImage}
        src={`http://localhost:8800/${avatar}`}
        alt="course_Image"
      />
    </Link>
  );
};

export default Course;

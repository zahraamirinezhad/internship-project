import React from "react";
import classes from "./Course.module.scss";
import { Edit, Delete, Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
import { coursesActions } from "../../store/course";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const Course = ({ id, token, title, avatar, goal, abstract, isTeacher }) => {
  const location = useLocation();
  // console.log(location);
  const url = location.pathname.split("/")[2];
  console.log(url);

  const dispatch = useDispatch();

  const logOut = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_ADDRESS}scores/logOut/${id}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      dispatch(coursesActions.deleteCourse(id));
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.courseInfo}>
        <div className={classes.courseTitle}>
          <h1 className={classes.title}>{title}</h1>
          {url === "myCourses" && (
            <div className={classes.optionsContainer}>
              {isTeacher && (
                <Link
                  className={`${classes.options} ${classes.editCourse}`}
                  to={`/editCourse/${id}`}
                >
                  <Edit />
                  Edit
                </Link>
              )}
              {isTeacher && (
                <button
                  className={`${classes.options} ${classes.deleteCourse}`}
                >
                  <Delete />
                  Delete
                </button>
              )}
              {!isTeacher && (
                <button
                  className={`${classes.options} ${classes.logOut}`}
                  onClick={logOut}
                >
                  <Logout />
                  Log Out
                </button>
              )}
            </div>
          )}
        </div>
        <div className={classes.courseGoal}>
          <p>{goal}</p>
        </div>
        <div>
          <p className={classes.courseDesc}>{abstract}</p>
        </div>
      </div>
      <Link to={isTeacher ? `/courseDataShow/${id}` : `/showCourse/${id}`}>
        <img
          className={classes.courseImage}
          src={`http://localhost:8800/${avatar}`}
          alt="course_Image"
        />
      </Link>
    </div>
  );
};

export default Course;

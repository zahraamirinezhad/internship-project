import React from "react";
import classes from "./WebCourse.module.scss";
import { Edit, Delete, Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
import { webCoursesActions } from "../../store/webCourse";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const WebCourse = ({ id, token, item, isTeacher }) => {
  const location = useLocation();
  // console.log(location);
  const url = location.pathname.split("/")[2];
  console.log(url);

  const dispatch = useDispatch();

  const logOut = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_ADDRESS}students/logOutWeb/${id}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      dispatch(webCoursesActions.deleteWebCourse(id));
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.courseInfo}>
        <div className={classes.courseTitle}>
          <h1 className={classes.title}>{item.title}</h1>
        </div>
        <div>
          <p className={classes.courseDesc}>{item.abstract}</p>
        </div>
        {url === "myCourses" && (
          <div className={classes.optionsContainer}>
            {isTeacher && (
              <Link
                className={`${classes.options} ${classes.editCourse}`}
                to={`/editWebCourse/${id}`}
              >
                <Edit />
                Edit
              </Link>
            )}
            {isTeacher && (
              <button className={`${classes.options} ${classes.deleteCourse}`}>
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
      <Link
        to={isTeacher ? `/webCourseDataShow/${id}` : `/showWebCourse/${id}`}
        className={classes.courseImage}
      >
        <iframe
          srcDoc={`
          <html>
            <body>${item.html}</body>
            <style>${item.css}</style>
            <script>${item.javascript}</script>
          </html>
        `}
          title="output"
          sandbox="allow-scripts"
          scrolling="no"
        />
      </Link>
    </div>
  );
};

export default WebCourse;

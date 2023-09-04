import React from "react";
import classes from "./User.module.scss";
import UserProfile from "../../images/user (2).png";
import { Link } from "react-router-dom";

const User = ({
  id,
  userName,
  firstName,
  lastName,
  studentNumber,
  avatar,
  bio,
  courseId,
}) => {
  console.log(userName, firstName, lastName, studentNumber, avatar, bio);
  return (
    <Link
      className={classes.container}
      to={`/studentWebCourseScore/${id}/${courseId}`}
    >
      <div className={classes.courseInfo}>
        <div className={classes.courseTitle}>{userName}</div>
        <div>
          <p className={classes.courseDesc}>{bio}</p>
        </div>
      </div>
      <img
        className={classes.courseImage}
        src={avatar === null ? UserProfile : `http://localhost:8800/${avatar}`}
        alt="course_Image"
      />
    </Link>
  );
};

export default User;

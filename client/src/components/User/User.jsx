import React from "react";
import classes from "./User.module.scss";
import UserProfile from "../../images/user (2).png";

const User = ({
  id,
  token,
  userName,
  firstName,
  lastName,
  studentNumber,
  avatar,
  bio,
  showStudentScore,
}) => {
  console.log(userName, firstName, lastName, studentNumber, avatar, bio);
  return (
    <div
      className={classes.container}
      onClick={() => {
        showStudentScore(firstName, lastName, studentNumber, id);
      }}
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
    </div>
  );
};

export default User;

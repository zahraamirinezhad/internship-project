import React from "react";
import classes from "./User.module.scss";
import { Link } from "react-router-dom";
import UserProfile from "../../images/user (2).png";

const User = ({ id, token, userName, avatar, bio }) => {
  return (
    <div className={classes.container}>
      <div className={classes.courseInfo}>
        <div className={classes.courseTitle}>{userName}</div>
        <div>
          <p className={classes.courseDesc}>{bio}</p>
        </div>
      </div>
      <Link>
        <img
          className={classes.courseImage}
          src={
            avatar === null ? UserProfile : `http://localhost:8800/${avatar}`
          }
          alt="course_Image"
        />
      </Link>
    </div>
  );
};

export default User;

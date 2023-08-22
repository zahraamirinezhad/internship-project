import React from "react";
import classes from "./UserSmallMenu.module.scss";
import { Link } from "react-router-dom";
import {
  AccountCircle,
  ManageAccounts,
  MenuBook,
  School,
  HistoryEdu,
  NoteAlt,
} from "@mui/icons-material";

const UserSmallMenu = ({ showMenuHandler, isShowMenu, isTeacher }) => {
  return (
    <>
      {isTeacher ? (
        <ul
          className={`${classes.container} ${
            isShowMenu ? classes.visible : classes.invisible
          }`}
        >
          <li onClick={showMenuHandler}>
            <Link
              className={classes.sidebarOptions}
              to="/profileStructure/profile"
            >
              <AccountCircle /> Profile
            </Link>
          </li>
          <li onClick={showMenuHandler}>
            <Link
              className={classes.sidebarOptions}
              to="/profileStructure/editProfile"
            >
              <ManageAccounts /> Edit Profile
            </Link>
          </li>
          <li onClick={showMenuHandler}>
            <Link className={classes.sidebarOptions} to="/createCourse">
              <MenuBook /> Create Course
            </Link>
          </li>
          <li onClick={showMenuHandler}>
            <Link
              className={classes.sidebarOptions}
              to="/profileStructure/createPractice"
            >
              <span>
                <NoteAlt /> Create Practice
              </span>
            </Link>
          </li>
          <li onClick={showMenuHandler}>
            <Link
              className={classes.sidebarOptions}
              to="/profileStructure/myCourses"
            >
              <School /> My Courses
            </Link>
          </li>
          <li onClick={showMenuHandler}>
            <Link
              className={classes.sidebarOptions}
              to="/profileStructure/myPractices"
            >
              <span>
                <HistoryEdu /> My Practices
              </span>
              <i></i>
            </Link>
          </li>
        </ul>
      ) : (
        <ul
          className={`${classes.container} ${
            isShowMenu ? classes.visible : classes.invisible
          }`}
        >
          <li onClick={showMenuHandler}>
            <Link
              className={classes.sidebarOptions}
              to="/profileStructure/profile"
            >
              <AccountCircle /> Profile
            </Link>
          </li>
          <li onClick={showMenuHandler}>
            <Link
              className={classes.sidebarOptions}
              to="/profileStructure/editProfile"
            >
              <ManageAccounts /> Edit Profile
            </Link>
          </li>
          <li onClick={showMenuHandler}>
            <Link className={classes.sidebarOptions} to="/practice">
              <MenuBook /> Practice
            </Link>
          </li>
          <li onClick={showMenuHandler}>
            <Link
              className={classes.sidebarOptions}
              to="/profileStructure/myCourses"
            >
              <School /> My Courses
            </Link>
          </li>
          <li onClick={showMenuHandler}>
            <Link
              className={classes.sidebarOptions}
              to="/profileStructure/myPractices"
            >
              <span>
                <HistoryEdu /> My Practices
              </span>
              <i></i>
            </Link>
          </li>
        </ul>
      )}
    </>
  );
};

export default UserSmallMenu;

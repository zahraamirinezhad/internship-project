import React from "react";
import classes from "./UserSmallMenu.module.scss";
import { Link } from "react-router-dom";
import {
  AccountCircle,
  ManageAccounts,
  MenuBook,
  School,
} from "@mui/icons-material";

const UserSmallMenu = ({ showMenuHandler, isShowMenu }) => {
  return (
    <ul
      className={`${classes.container} ${
        isShowMenu ? classes.visible : classes.invisible
      }`}
    >
      <li onClick={showMenuHandler}>
        <Link className={classes.sidebarOptions} to="/profileStructure/profile">
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
    </ul>
  );
};

export default UserSmallMenu;

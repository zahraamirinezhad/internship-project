import { React } from "react";
import classes from "./SmallOptionsMenu.module.scss";
import User from "../../../images/user.png";
import Login from "../../../images/login.png";
import Home from "../../../images/home.png";
import { Link } from "react-router-dom";

const SmallOptionsMenu = ({
  showOptionsMenuHandler,
  isShowOptionsMenu,
  userProfile,
  userUserName,
}) => {
  return (
    <ul
      className={`${classes.optionsMenu} ${
        isShowOptionsMenu ? classes.visible : classes.invisible
      }`}
    >
      <li onClick={showOptionsMenuHandler} className={classes.userProfile}>
        <Link to="/profileStructure/profile" className={classes.profile}>
          <img src={userProfile === null ? User : userProfile} alt="user" />
          <h4>{userUserName}</h4>
        </Link>
      </li>
      <li onClick={showOptionsMenuHandler}>
        <Link className={classes.btn} to="/login">
          <img src={Login} alt="login" />
        </Link>
      </li>
      <li onClick={showOptionsMenuHandler}>
        <Link className={classes.btn} to="/mainPage">
          <img src={Home} alt="home" />
        </Link>
      </li>
    </ul>
  );
};

export default SmallOptionsMenu;

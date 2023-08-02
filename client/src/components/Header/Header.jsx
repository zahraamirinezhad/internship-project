import { React, useState, useEffect } from "react";
import classes from "./Header.module.scss";
import Login from "../../images/login.png";
import Home from "../../images/home.png";
import User from "../../images/user.png";
import OptionsMenu from "../../images/userIcon.png";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import SmallOptionsMenu from "../SmallMenus/SmallOptionsMenu/SmallOptionsMenu";
import UserSmallMenu from "../SmallMenus/UserSmallMenu/UserSmallMenu";
import Skeleton from "../Skeleton/Skeleton";
import Menu from "../../images/burger-menu.png";

const Header = ({ token, isTeacher }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowOptionsMenu, setIsShowOptionsMenu] = useState(false);

  console.log(token);
  console.log(isTeacher);

  const location = useLocation();
  // console.log(location);
  const url = location.pathname.split("/")[2];

  const [userProfile, setUserProfile] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    console.log(token);
    console.log(isTeacher);
    const getUserData = async () => {
      try {
        let res = null;
        if (isTeacher) {
          res = await axios.get(
            `${process.env.REACT_APP_API_ADDRESS}teachers/find`,
            {
              headers: {
                token: `Bearer ${token}`,
              },
            }
          );
        } else {
          res = await axios.get(
            `${process.env.REACT_APP_API_ADDRESS}students/find`,
            {
              headers: {
                token: `Bearer ${token}`,
              },
            }
          );
        }
        console.log(res);
        setUserProfile(
          res.data.profilePic === null
            ? User
            : `http://localhost:8800/${res.data.profilePic}`
        );
        setUserName(res.data.username);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  const showMenuHandler = () => {
    setIsShowOptionsMenu(false);
    setIsShowMenu(!isShowMenu);
  };

  const showOptionsMenuHandler = () => {
    setIsShowMenu(false);
    setIsShowOptionsMenu(!isShowOptionsMenu);
  };

  return (
    <div className={classes.container}>
      <div className={classes.options}>
        <div className={classes.smallOptionsMenu}>
          <button
            className={classes.showOptionsMenuBTN}
            onClick={showOptionsMenuHandler}
          >
            <img src={OptionsMenu} alt="options_menu" />
          </button>
          <SmallOptionsMenu
            showOptionsMenuHandler={showOptionsMenuHandler}
            isShowOptionsMenu={isShowOptionsMenu}
            userProfile={userProfile}
            userUserName={userName}
          />
        </div>
        <div>
          <Link className={classes.btn} to="/login">
            <img src={Login} alt="login" />
          </Link>
        </div>
        <div>
          <Link className={classes.btn} to="/mainPage">
            <img src={Home} alt="home" />
          </Link>
        </div>
      </div>

      <div className={classes.title}>
        <h1>Z.A_Learn</h1>
      </div>

      {isLoading ? (
        <Skeleton type="Toolbar" />
      ) : (
        <div className={classes.userInfo}>
          <Link to="/profileStructure/profile" className={classes.account}>
            <h4>{userName}</h4>
          </Link>
          <Link to="/profileStructure/profile" className={classes.profile}>
            <img src={userProfile === null ? User : userProfile} alt="user" />
          </Link>

          {url === "profileStructure" && (
            <div className={classes.smallMenu}>
              <button className={classes.showMenuBTN} onClick={showMenuHandler}>
                <img src={Menu} alt="menu" />
              </button>

              {url === "profileStructure" && (
                <UserSmallMenu
                  showMenuHandler={showMenuHandler}
                  isShowMenu={isShowMenu}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;

import { React, useState, useEffect } from "react";
import classes from "./ProfileStructure.module.scss";
import { useLocation, Link } from "react-router-dom";
import {
  Profile,
  EditProfile,
  CreateCourse,
  MyCourses,
  Skeleton,
} from "../../components";
import {
  AccountCircle,
  ManageAccounts,
  MenuBook,
  School,
} from "@mui/icons-material";
import axios from "axios";

const ProfileStructure = ({ token }) => {
  const [userIsTeacher, setUserIsTeacher] = useState(false);

  const location = useLocation();
  // console.log(location.pathname);
  const url =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}users/status`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        setUserIsTeacher(res.data.isTeacher);
        console.log(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  return (
    <div className={classes.container}>
      {isLoading ? (
        <Skeleton type="ProfileStructureSkeleton" />
      ) : (
        <div className={classes.sidebar}>
          <Link
            className={classes.sidebarOptions}
            to="/profileStructure/profile"
          >
            <AccountCircle /> Profile
          </Link>
          <Link
            className={classes.sidebarOptions}
            to="/profileStructure/editProfile"
          >
            <ManageAccounts /> Edit Profile
          </Link>
          {userIsTeacher ? (
            <Link
              className={classes.sidebarOptions}
              to="/profileStructure/createCourse"
            >
              <MenuBook /> Create Course
            </Link>
          ) : (
            <Link className={classes.sidebarOptions} to="/practice">
              <MenuBook /> Practice
            </Link>
          )}
          <Link
            className={classes.sidebarOptions}
            to="/profileStructure/myCourses"
          >
            <School /> My Courses
          </Link>
        </div>
      )}

      <div className={classes.main}>
        {
          {
            profile: <Profile token={token} />,
            myCourses: <MyCourses token={token} />,
            editProfile: <EditProfile token={token} />,
            createCourse: <CreateCourse token={token} />,
          }[url]
        }
      </div>
    </div>
  );
};

export default ProfileStructure;

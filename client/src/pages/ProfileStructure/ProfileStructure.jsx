import { React } from "react";
import classes from "./ProfileStructure.module.scss";
import { useLocation, Link } from "react-router-dom";
import { Profile, EditProfile } from "../../components";
import {
  AccountCircle,
  ManageAccounts,
  MenuBook,
  School,
} from "@mui/icons-material";

const ProfileStructure = ({ token }) => {
  const location = useLocation();
  // console.log(location.pathname);
  const url =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <Link className={classes.sidebarOptions} to="/profileStructure/profile">
          <AccountCircle /> Profile
        </Link>
        <Link
          className={classes.sidebarOptions}
          to="/profileStructure/editProfile"
        >
          <ManageAccounts /> Edit Profile
        </Link>
        <Link className={classes.sidebarOptions} to="/practice">
          <MenuBook /> Practice
        </Link>
        <Link
          className={classes.sidebarOptions}
          to="/profileStructure/myCourses"
        >
          <School /> My Courses
        </Link>
      </div>
      <div className={classes.main}>
        {
          {
            profile: <Profile token={token} />,
            // myCourses: <MyCourses token={token} />,
            editProfile: <EditProfile token={token} />,
          }[url]
        }
      </div>
    </div>
  );
};

export default ProfileStructure;

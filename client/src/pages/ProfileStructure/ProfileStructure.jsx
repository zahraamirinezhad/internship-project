import { React } from "react";
import classes from "./ProfileStructure.module.scss";
import MyProfile from "../../images/MyProfile.png";
import My_Idea from "../../images/MyIdea.png";
import Edit_Profile from "../../images/EditProfile.png";
import { useLocation, Link } from "react-router-dom";
import { Profile } from "../../components";

const ProfileStructure = ({ token }) => {
  const location = useLocation();
  console.log(location.pathname);
  const url =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <Link className={classes.sidebarOptions} to="/profileStructure/profile">
          <img src={MyProfile} alt="Profile" /> Profile
        </Link>
        <Link
          className={classes.sidebarOptions}
          to="/profileStructure/editProfile"
        >
          <img src={Edit_Profile} alt="Edit_Profile" /> Edit Profile
        </Link>
        <Link className={classes.sidebarOptions} to="/profileStructure/myIdeas">
          <img src={My_Idea} alt="My_Ideas" /> My Courses
        </Link>
      </div>
      <div className={classes.main}>
        {
          {
            profile: <Profile token={token} />,
            // myCourses: <MyCourses token={token} />,
            // editProfile: <EditProfile token={token} />,
          }[url]
        }
      </div>
    </div>
  );
};

export default ProfileStructure;

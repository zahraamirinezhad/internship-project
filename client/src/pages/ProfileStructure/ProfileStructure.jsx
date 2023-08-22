import { React } from "react";
import classes from "./ProfileStructure.module.scss";
import { useLocation, Link, useParams } from "react-router-dom";
import {
  Profile,
  EditProfile,
  CreateCourse,
  MyCourses,
  MyPractices,
  CreatePractice,
  WhichPractice,
  WhichExam,
  CreateWebCourse,
  CreateWebPractice,
} from "../../components";
import {
  AccountCircle,
  ManageAccounts,
  MenuBook,
  School,
  HistoryEdu,
  NoteAlt,
} from "@mui/icons-material";

const ProfileStructure = ({ token, isTeacher }) => {
  const location = useLocation();
  // console.log(location.pathname);
  const url =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  return (
    <div className={classes.container}>
      {isTeacher ? (
        <div className={classes.sidebar}>
          <Link
            style={{ "--clr": "#ca004e" }}
            className={classes.sidebarOptions}
            to="/profileStructure/profile"
          >
            <span>
              <AccountCircle /> Profile
            </span>
            <i></i>
          </Link>
          <Link
            style={{ "--clr": "#0000b3" }}
            className={classes.sidebarOptions}
            to="/profileStructure/editProfile"
          >
            <span>
              <ManageAccounts /> Edit Profile
            </span>
            <i></i>
          </Link>
          <Link
            style={{ "--clr": "#e60000" }}
            className={classes.sidebarOptions}
            to="/profileStructure/whichExam"
          >
            <span>
              <MenuBook /> Create Exam
            </span>
            <i></i>
          </Link>
          <Link
            style={{ "--clr": "#006666" }}
            className={classes.sidebarOptions}
            to="/profileStructure/whichPractice"
          >
            <span>
              <NoteAlt /> Create Practice
            </span>
            <i></i>
          </Link>
          <Link
            style={{ "--clr": "#009900" }}
            className={classes.sidebarOptions}
            to="/profileStructure/myCourses"
          >
            <span>
              <School /> My Courses
            </span>
            <i></i>
          </Link>
          <Link
            style={{ "--clr": "#99003d" }}
            className={classes.sidebarOptions}
            to="/profileStructure/myPractices"
          >
            <span>
              <HistoryEdu /> My Practices
            </span>
            <i></i>
          </Link>
        </div>
      ) : (
        <div className={classes.sidebar}>
          <Link
            style={{ "--clr": "#ca004e" }}
            className={classes.sidebarOptions}
            to="/profileStructure/profile"
          >
            <span>
              <AccountCircle /> Profile
            </span>
            <i></i>
          </Link>
          <Link
            style={{ "--clr": "#0000b3" }}
            className={classes.sidebarOptions}
            to="/profileStructure/editProfile"
          >
            <span>
              <ManageAccounts /> Edit Profile
            </span>
            <i></i>
          </Link>
          <Link
            style={{ "--clr": "#e60000" }}
            className={classes.sidebarOptions}
            to="/practice"
          >
            <span>
              <MenuBook /> Practice
            </span>
            <i></i>
          </Link>
          <Link
            style={{ "--clr": "#009900" }}
            className={classes.sidebarOptions}
            to="/profileStructure/myCourses"
          >
            <span>
              <School /> My Exams
            </span>
            <i></i>
          </Link>
          <Link
            style={{ "--clr": "#99003d" }}
            className={classes.sidebarOptions}
            to="/profileStructure/myPractices"
          >
            <span>
              <HistoryEdu /> My Practices
            </span>
            <i></i>
          </Link>
        </div>
      )}

      <div className={classes.main}>
        {
          {
            profile: <Profile token={token} isTeacher={isTeacher} />,
            myCourses: <MyCourses token={token} isTeacher={isTeacher} />,
            editProfile: <EditProfile token={token} isTeacher={isTeacher} />,
            whichPractice: <WhichPractice token={token} isTeacher={true} />,
            whichExam: <WhichExam token={token} isTeacher={true} />,
            createCourse: <CreateCourse token={token} isTeacher={true} />,
            createPractice: <CreatePractice token={token} isTeacher={true} />,
            createWebCourse: <CreateWebCourse token={token} isTeacher={true} />,
            createWebPractice: (
              <CreateWebPractice token={token} isTeacher={true} />
            ),
            myPractices: <MyPractices token={token} isTeacher={isTeacher} />,
          }[url]
        }
      </div>
    </div>
  );
};

export default ProfileStructure;

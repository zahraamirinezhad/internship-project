import { React, useEffect, useState } from "react";
import classes from "./MainPage.module.scss";
import axios from "axios";
import Course from "../../components/Course/Course";
import Skeleton from "../../components/Skeleton/Skeleton";
import UserProfile from "../../images/user (2).png";
import { Link } from "react-router-dom";

const MainPage = ({ token, isTeacher }) => {
  const [seeAll, setSeeAll] = useState(false);
  const [seeAllMyCourses, setSeeAllMyCourses] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);

  const [userProfile, setUserProfile] = useState(null);
  const [userUserName, setUserUserName] = useState(null);

  // const showMenuHandler = () => {
  //   setIsShowOptionsMenu(false);
  //   setIsShowMenu(!isShowMenu);
  // };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}courses/`
        );
        console.log(res);
        setCourses(res.data);

        let userRes = null;
        let courseRes = null;
        if (isTeacher) {
          userRes = await axios.get(
            `${process.env.REACT_APP_API_ADDRESS}teachers/find`,
            {
              headers: {
                token: `Bearer ${token}`,
              },
            }
          );
          courseRes = await axios.get(
            `${process.env.REACT_APP_API_ADDRESS}teachers/getMyCourses`,
            {
              headers: {
                token: `Bearer ${token}`,
              },
            }
          );
        } else {
          userRes = await axios.get(
            `${process.env.REACT_APP_API_ADDRESS}students/find`,
            {
              headers: {
                token: `Bearer ${token}`,
              },
            }
          );
          courseRes = await axios.get(
            `${process.env.REACT_APP_API_ADDRESS}students/getTakenCourses`,
            {
              headers: {
                token: `Bearer ${token}`,
              },
            }
          );
        }
        console.log(userRes.data);
        console.log(courseRes.data);
        setUserProfile(
          userRes.data.profilePic === null
            ? UserProfile
            : `http://localhost:8800/${userRes.data.profilePic}`
        );
        setUserUserName(userRes.data.username);

        setMyCourses(courseRes.data);

        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.userData}>
        <Link to="/profileStructure/profile" className={classes.profile}>
          <img src={userProfile} alt="profile" />
        </Link>
        <div>
          <h1>{`WELCOME ${userUserName}`}</h1>
          <h1>{`WELCOME ${userUserName}`}</h1>
          <h1>{`WELCOME ${userUserName}`}</h1>
          <h1>{`WELCOME ${userUserName}`}</h1>
        </div>
      </div>
      <div className={classes.seeAllContainer}>
        <button
          className={`${classes.seeAllIdeas} ${
            seeAll && classes.disableButton
          }`}
          onClick={() => setSeeAllMyCourses(true)}
          disabled={seeAllMyCourses}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          See All
        </button>
      </div>

      <div className={classes.myCoursesContainer}>
        <h2 className={classes.title}>Your Courses</h2>
        <div className={classes.myCourseListContainer}>
          <div className={classes.borderLine}></div>
          <div
            className={`${classes.myCourses} ${
              seeAllMyCourses && classes.scrollable
            }`}
          >
            {isLoading ? (
              <Skeleton type="Course" />
            ) : (
              <>
                {seeAllMyCourses
                  ? myCourses.map((item, index) => (
                      <Course
                        key={index}
                        id={item.id}
                        token={token}
                        title={item.title}
                        avatar={item.avatar}
                        goal={item.goal}
                        abstract={item.abstract}
                        isTeacher={isTeacher}
                      />
                    ))
                  : myCourses.map(
                      (item, index) =>
                        index < 6 && (
                          <Course
                            key={index}
                            id={item.id}
                            token={token}
                            title={item.title}
                            avatar={item.avatar}
                            goal={item.goal}
                            abstract={item.abstract}
                            isTeacher={isTeacher}
                          />
                        )
                    )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className={classes.seeAllContainer}>
        <button
          className={`${classes.seeAllIdeas} ${
            seeAll && classes.disableButton
          }`}
          onClick={() => setSeeAll(true)}
          disabled={seeAll}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          See All
        </button>
      </div>
      <div className={classes.coursesContainer}>
        <h2 className={classes.title}>All Courses</h2>
        <div className={classes.courseListContainer}>
          <div className={classes.borderLine}></div>
          <div className={`${classes.courses} ${seeAll && classes.scrollable}`}>
            {isLoading ? (
              <Skeleton type="Course" />
            ) : (
              <>
                {seeAll
                  ? courses.map((item, index) => (
                      <Course
                        key={index}
                        id={item.id}
                        token={token}
                        title={item.title}
                        avatar={item.avatar}
                        goal={item.goal}
                        abstract={item.abstract}
                        isTeacher={isTeacher}
                      />
                    ))
                  : courses.map(
                      (item, index) =>
                        index < 6 && (
                          <Course
                            key={index}
                            id={item.id}
                            token={token}
                            title={item.title}
                            avatar={item.avatar}
                            goal={item.goal}
                            abstract={item.abstract}
                            isTeacher={isTeacher}
                          />
                        )
                    )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;

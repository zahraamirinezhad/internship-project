import { React, useEffect, useState } from "react";
import classes from "./MainPage.module.scss";
import axios from "axios";
import Course from "../../components/Course/Course";
import WebCourse from "../../components/WebCourse/WebCourse";
import Skeleton from "../../components/Skeleton/Skeleton";
import UserProfile from "../../images/user (2).png";
import { Link } from "react-router-dom";

const MainPage = ({ token, isTeacher }) => {
  const [seeAll, setSeeAll] = useState(false);
  const [seeAllExams, setSeeAllExams] = useState(false);
  const [seeAllMyCourses, setSeeAllMyCourses] = useState(false);
  const [seeAllMyPractices, setSeeAllMyPractices] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [exams, setExams] = useState([]);
  const [webExams, setWebExams] = useState([]);
  const [practices, setPractices] = useState([]);
  const [webPractices, setWebPractices] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [myPractices, setMyPractices] = useState([]);

  const [userProfile, setUserProfile] = useState(null);
  const [userUserName, setUserUserName] = useState(null);

  // const showMenuHandler = () => {
  //   setIsShowOptionsMenu(false);
  //   setIsShowMenu(!isShowMenu);
  // };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const examsRes = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}courses/getExams`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log(examsRes);
        setExams(examsRes.data);

        const webExamsRes = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}webCourses/getExams`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log(webExamsRes);
        setWebExams(webExamsRes.data);

        const practicesRes = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}courses/getPractices`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log(practicesRes);
        setPractices(practicesRes.data);

        const webPracticesRes = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}webCourses/getPractices`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log(webPracticesRes);
        setWebPractices(webPracticesRes.data);

        let userRes = null;
        let myCourseRes = null;
        let myPracRes = null;
        if (isTeacher) {
          userRes = await axios.get(
            `${process.env.REACT_APP_API_ADDRESS}teachers/find`,
            {
              headers: {
                token: `Bearer ${token}`,
              },
            }
          );
          myCourseRes = await axios.get(
            `${process.env.REACT_APP_API_ADDRESS}teachers/getMyExams`,
            {
              headers: {
                token: `Bearer ${token}`,
              },
            }
          );
          myPracRes = await axios.get(
            `${process.env.REACT_APP_API_ADDRESS}teachers/getMyPractices`,
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
          myCourseRes = await axios.get(
            `${process.env.REACT_APP_API_ADDRESS}students/getTakenExams`,
            {
              headers: {
                token: `Bearer ${token}`,
              },
            }
          );
          myCourseRes.data =
            myCourseRes.data[0] === null ? [] : myCourseRes.data;

          myPracRes = await axios.get(
            `${process.env.REACT_APP_API_ADDRESS}students/getTakenPractices`,
            {
              headers: {
                token: `Bearer ${token}`,
              },
            }
          );
          myPracRes.data = myPracRes.data[0] === null ? [] : myPracRes.data;
        }
        console.log(userRes.data);
        console.log(myCourseRes.data);
        console.log(myPracRes.data);
        setUserProfile(
          userRes.data.profilePic === null
            ? UserProfile
            : `http://localhost:8800/${userRes.data.profilePic}`
        );
        setUserUserName(userRes.data.username);

        setMyCourses(myCourseRes.data);
        setMyPractices(myPracRes.data);

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
        <Skeleton type="MainPageUserData" />
      ) : (
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
      )}
      <div className={classes.seeAllContainer}>
        <button
          className={`${classes.seeAllIdeas} ${
            seeAll && classes.disableButton
          }`}
          onClick={() => setSeeAllMyCourses(!seeAllMyCourses)}
        >
          See All
        </button>
      </div>
      <div className={classes.myCoursesContainer}>
        <h2 className={classes.title}>Your Courses</h2>
        {myCourses.length !== 0 ? (
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
        ) : (
          <p className={classes.noCourse}>Sorry, No Course :((</p>
        )}
      </div>

      <div className={classes.seeAllContainer}>
        <button
          className={`${classes.seeAllIdeas} ${
            seeAll && classes.disableButton
          }`}
          onClick={() => setSeeAllMyPractices(!seeAllMyPractices)}
        >
          See All
        </button>
      </div>
      <div className={classes.myCoursesContainer}>
        <h2 className={classes.title}>Your Practices</h2>
        {myPractices.length !== 0 ? (
          <div className={classes.myCourseListContainer}>
            <div className={classes.borderLine}></div>
            <div
              className={`${classes.myCourses} ${
                seeAllMyPractices && classes.scrollable
              }`}
            >
              {isLoading ? (
                <Skeleton type="Course" />
              ) : (
                <>
                  {seeAllMyPractices
                    ? myPractices.map((item, index) => (
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
                    : myPractices.map(
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
        ) : (
          <p className={classes.noCourse}>Sorry, No Practices :((</p>
        )}
      </div>

      <div className={classes.seeAllContainer}>
        <button
          className={`${classes.seeAllIdeas} ${
            seeAll && classes.disableButton
          }`}
          onClick={() => setSeeAll(!seeAll)}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          See All
        </button>
      </div>
      <div className={classes.coursesContainer}>
        <h2 className={classes.title}>All Exams</h2>
        {exams.length !== 0 ? (
          <div className={classes.courseListContainer}>
            <div className={classes.borderLine}></div>
            <div
              className={`${classes.courses} ${seeAll && classes.scrollable}`}
            >
              {isLoading ? (
                <Skeleton type="Course" />
              ) : (
                <>
                  {seeAll
                    ? exams.map((item, index) => (
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
                    : exams.map(
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
        ) : (
          <p className={classes.noCourse}>Sorry, No Course :((</p>
        )}
      </div>

      <div className={classes.seeAllContainer}>
        <button
          className={`${classes.seeAllIdeas} ${
            seeAll && classes.disableButton
          }`}
          onClick={() => setSeeAllExams(!seeAllExams)}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          See All
        </button>
      </div>
      <div className={classes.coursesContainer}>
        <h2 className={classes.title}>All Practices</h2>
        {practices.length !== 0 ? (
          <div className={classes.courseListContainer}>
            <div className={classes.borderLine}></div>
            <div
              className={`${classes.courses} ${
                seeAllExams && classes.scrollable
              }`}
            >
              {isLoading ? (
                <Skeleton type="Course" />
              ) : (
                <>
                  {seeAllExams
                    ? practices.map((item, index) => (
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
                    : practices.map(
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
        ) : (
          <p className={classes.noCourse}>Sorry, No Practices :((</p>
        )}
      </div>

      <div className={classes.seeAllContainer}>
        <button
          className={`${classes.seeAllIdeas} ${
            seeAll && classes.disableButton
          }`}
          onClick={() => setSeeAll(!seeAll)}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          See All
        </button>
      </div>
      <div className={classes.coursesContainer}>
        <h2 className={classes.title}>All Web Exams</h2>
        {webExams.length !== 0 ? (
          <div className={classes.courseListContainer}>
            <div className={classes.borderLine}></div>
            <div
              className={`${classes.courses} ${seeAll && classes.scrollable}`}
            >
              {isLoading ? (
                <Skeleton type="Course" />
              ) : (
                <>
                  {seeAll
                    ? webExams.map((item, index) => (
                        <WebCourse
                          key={index}
                          id={item.id}
                          token={token}
                          title={item.title}
                          srDoc={item.question}
                          abstract={item.abstract}
                          isTeacher={isTeacher}
                        />
                      ))
                    : webExams.map(
                        (item, index) =>
                          index < 6 && (
                            <WebCourse
                              key={index}
                              id={item.id}
                              token={token}
                              isTeacher={isTeacher}
                              item={item}
                            />
                          )
                      )}
                </>
              )}
            </div>
          </div>
        ) : (
          <p className={classes.noCourse}>Sorry, No Course :((</p>
        )}
      </div>

      <div className={classes.seeAllContainer}>
        <button
          className={`${classes.seeAllIdeas} ${
            seeAll && classes.disableButton
          }`}
          onClick={() => setSeeAllExams(!seeAllExams)}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          See All
        </button>
      </div>
      <div className={classes.coursesContainer}>
        <h2 className={classes.title}>All Web Practices</h2>
        {webPractices.length !== 0 ? (
          <div className={classes.courseListContainer}>
            <div className={classes.borderLine}></div>
            <div
              className={`${classes.courses} ${
                seeAllExams && classes.scrollable
              }`}
            >
              {isLoading ? (
                <Skeleton type="Course" />
              ) : (
                <>
                  {seeAllExams
                    ? webPractices.map((item, index) => (
                        <WebCourse
                          key={index}
                          id={item.id}
                          token={token}
                          isTeacher={isTeacher}
                          item={item}
                        />
                      ))
                    : webPractices.map(
                        (item, index) =>
                          index < 6 && (
                            <WebCourse
                              key={index}
                              id={item.id}
                              token={token}
                              isTeacher={isTeacher}
                              item={item}
                            />
                          )
                      )}
                </>
              )}
            </div>
          </div>
        ) : (
          <p className={classes.noCourse}>Sorry, No Practices :((</p>
        )}
      </div>
    </div>
  );
};

export default MainPage;

import React, { useEffect, useState } from "react";
import classes from "./MyPractices.module.scss";
import axios from "axios";
import Course from "../Course/Course";
import { useDispatch, useSelector } from "react-redux";
import { coursesActions } from "../../store/course";
import { webCoursesActions } from "../../store/webCourse";
import WebCourse from "../WebCourse/WebCourse";
import Skeleton from "../Skeleton/Skeleton";

const MyPractices = ({ token, isTeacher }) => {
  const dispatch = useDispatch();

  const userCourses = useSelector((state) => state.courses.courses);
  const userCoursesNum = useSelector((state) => state.courses.coursesNum);

  const userWebCourses = useSelector((state) => state.webCourses.webCourses);
  const userWebCoursesNum = useSelector(
    (state) => state.webCourses.webCoursesNum
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (isTeacher) {
          const res = await axios.get(
            `${process.env.REACT_APP_API_ADDRESS}teachers/getMyPractices`,
            {
              headers: {
                token: `Bearer ${token}`,
              },
            }
          );
          res.data = res.data[0] === null ? [] : res.data;
          console.log(res.data);
          dispatch(coursesActions.setData(res.data));
          const webRes = await axios.get(
            `${process.env.REACT_APP_API_ADDRESS}teachers/getMyWebPractices`,
            {
              headers: {
                token: `Bearer ${token}`,
              },
            }
          );
          webRes.data = webRes.data[0] === null ? [] : webRes.data;
          console.log(res.data);
          dispatch(webCoursesActions.setData(webRes.data));
          setIsLoading(false);
        } else {
          const res = await axios.get(
            `${process.env.REACT_APP_API_ADDRESS}students/getTakenPractices`,
            {
              headers: {
                token: `Bearer ${token}`,
              },
            }
          );
          console.log(res.data);
          res.data = res.data[0] === null ? [] : res.data;
          dispatch(coursesActions.setData(res.data));
          const webRes = await axios.get(
            `${process.env.REACT_APP_API_ADDRESS}students/getTakenWebPractices`,
            {
              headers: {
                token: `Bearer ${token}`,
              },
            }
          );
          webRes.data = webRes.data[0] === null ? [] : webRes.data;
          console.log(webRes.data);
          dispatch(webCoursesActions.setData(webRes.data));
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  return (
    <div className={classes.container}>
      <h2>My Practices</h2>
      <div className={classes.courses}>
        {isLoading ? (
          <Skeleton type="Course" />
        ) : (
          userCourses.map((item, index) => (
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
        )}
      </div>
      <h2>My Web Practices</h2>
      <div className={classes.courses}>
        {isLoading ? (
          <Skeleton type="Course" />
        ) : (
          userWebCourses.map((item, index) => (
            <WebCourse
              key={index}
              id={item.id}
              token={token}
              item={item}
              isTeacher={isTeacher}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyPractices;

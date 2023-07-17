import React, { useEffect, useState } from "react";
import classes from "./MyCourses.module.scss";
import axios from "axios";
import Course from "../Course/Course";
import { useDispatch, useSelector } from "react-redux";
import { coursesActions } from "../../store/course";
import Skeleton from "../Skeleton/Skeleton";

const MyCourses = ({ token }) => {
  const dispatch = useDispatch();
  const userCourses = useSelector((state) => state.courses.courses);
  const userCoursesNum = useSelector((state) => state.courses.coursesNum);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}courses/`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data);
        dispatch(coursesActions.setData(res.data));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.courses}>
        {isLoading ? (
          <Skeleton type="Course" />
        ) : (
          userCourses.map((item, index) => (
            <Course
              key={index}
              type="MyCourses"
              id={item._id}
              token={token}
              title={item.title}
              avatar={item.avatar}
              goal={item.goal}
              abstract={item.abstract}
              isTeacher={true}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyCourses;

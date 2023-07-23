import { React, useEffect, useState } from "react";
import classes from "./MainPage.module.scss";
import axios from "axios";
import Course from "../../components/Course/Course";
import Skeleton from "../../components/Skeleton/Skeleton";

const MainPage = ({ token, isTeacher }) => {
  const [seeAll, setSeeAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);

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
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  return (
    <div className={classes.container}>
      {/* <span className={`${classes.backCricle} ${classes.red}`}></span>
      <span className={`${classes.backCricle} ${classes.green}`}></span>
      <span className={`${classes.backCricle} ${classes.blue}`}></span>
      <span className={`${classes.backCricle} ${classes.pink}`}></span> */}
      <div className={classes.seeAllContainer}>
        <button
          className={`${classes.seeAllIdeas} ${
            seeAll && classes.disableButton
          }`}
          onClick={() => setSeeAll(true)}
          disabled={seeAll}
        >
          See All
        </button>
      </div>

      <div className={classes.coursesContainer}>
        <div className={`${classes.courses} ${seeAll && classes.scrollable}`}>
          {isLoading ? (
            <Skeleton type="Course" />
          ) : (
            <>
              {seeAll
                ? courses.map((item, index) => (
                    <Course
                      key={index}
                      type="MainPage"
                      id={item.id}
                      token={token}
                      title={item.title}
                      avatar={item.avatar}
                      goal={item.goal}
                      abstract={item.abstract}
                      isTeacher={false}
                    />
                  ))
                : courses.map(
                    (item, index) =>
                      index < 6 && (
                        <Course
                          key={index}
                          type="MainPage"
                          id={item.id}
                          token={token}
                          title={item.title}
                          avatar={item.avatar}
                          goal={item.goal}
                          abstract={item.abstract}
                          isTeacher={true}
                        />
                      )
                  )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;

import { React, useState, useEffect } from "react";
import classes from "./ShowCourse.module.scss";
import { useParams } from "react-router-dom";
import SelectImage from "../../images/selectImage.png";
import { useDispatch, useSelector } from "react-redux";
import { levelsActions } from "../../store/levels";
import axios from "axios";
import LevelShow from "../../components/LevelShow/LevelShow";

const ShowCourse = ({ token }) => {
  const params = useParams();
  const courseId = params.courseId;

  const dispatch = useDispatch();

  const levels = useSelector((state) => state.levels.levels);
  const levelsNum = useSelector((state) => state.levels.levelsNum);

  const [courseName, setCourseName] = useState("");
  const [courseGoal, setCourseGoal] = useState("");
  const [courseBio, setCourseBio] = useState("");
  const [courseImage, setCourseImage] = useState(null);
  const [courseTaken, setCourseTaken] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const docsRes = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}courses/getCourse/${courseId}`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log(docsRes);

        setCourseName(docsRes.data.title);
        setCourseGoal(docsRes.data.goal);
        setCourseBio(docsRes.data.abstract);
        setCourseImage(
          docsRes.data.avatar === null
            ? SelectImage
            : `http://localhost:8800/${docsRes.data.avatar}`
        );

        dispatch(levelsActions.deleteAllLevels());
        const levelRes = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}courses/getCourseLevels/${courseId}`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log(levelRes);
        for (let i = 0; i < levelRes.data.length; i++) {
          dispatch(
            levelsActions.addLevel({
              id: levelRes.data[i].level.id,
              title: levelRes.data[i].level.title,
              doc: levelRes.data[i].level.doc,
              desc: levelRes.data[i].level.description,
              isExam: docsRes.data.isExam,
            })
          );
        }

        const isTakenRes = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}students/isCourseTaken/${courseId}`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log(isTakenRes);
        setCourseTaken(isTakenRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  const takeCourse = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ADDRESS}students/takeCourse`,
        {
          courseId: courseId,
        },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      setCourseTaken(!courseTaken);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const logOut = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_ADDRESS}students/logOut/${courseId}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      setCourseTaken(false);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.courseDetails}>
        <span className={classes.border}></span>
        <span className={classes.border}></span>
        <span className={classes.border}></span>
        <span className={classes.border}></span>
        <div className={classes.courseImage}>
          <img src={courseImage} alt="Select_Image" />
        </div>
        <div className={classes.enterCourseDetails}>
          <div className={classes.enterData}>
            <input value={courseName} type="text" readOnly />
            <span>Title</span>
          </div>
          <div className={classes.enterData}>
            <input value={courseGoal} type="text" readOnly />
            <span>Goals</span>
          </div>
          <div className={classes.enterData}>
            <textarea value={courseBio} readOnly />
            <span>Abstract</span>
          </div>
        </div>
      </div>

      <div className={classes.courseOptions}>
        {courseTaken ? (
          <button className={classes.logOut} onClick={logOut}>
            Log Out :(((
          </button>
        ) : (
          <button className={classes.takeCourse} onClick={takeCourse}>
            Take the Course :)))
          </button>
        )}
      </div>

      {levelsNum !== 0 ? (
        <div
          className={`${classes.courseLevels} ${
            courseTaken && classes.courseTaken
          }`}
        >
          {levels.map((item, index) => (
            <LevelShow
              key={index}
              id={item.id}
              title={item.title}
              doc={item.doc}
              desc={item.desc}
              isExam={item.isExam}
            />
          ))}
        </div>
      ) : (
        <p className={classes.empty}>No Levels</p>
      )}
    </div>
  );
};

export default ShowCourse;

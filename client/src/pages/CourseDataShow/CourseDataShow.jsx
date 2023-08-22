import { React, useState, useEffect } from "react";
import classes from "./CourseDataShow.module.scss";
import { useParams } from "react-router-dom";
import SelectImage from "../../images/selectImage.png";
import { useDispatch, useSelector } from "react-redux";
import { levelsActions } from "../../store/levels";
import { usersActions } from "../../store/user";
import axios from "axios";
import User from "../../components/User/User";
import LevelShow from "../../components/LevelShow/LevelShow";

const CourseDataShow = ({ token }) => {
  const params = useParams();
  const courseId = params.courseId;

  const dispatch = useDispatch();
  const levels = useSelector((state) => state.levels.levels);
  const levelsNum = useSelector((state) => state.levels.levelsNum);

  const students = useSelector((state) => state.users.users);
  const studentsNum = useSelector((state) => state.courses.usersNum);

  const [courseName, setCourseName] = useState("");
  const [courseGoal, setCourseGoal] = useState("");
  const [courseBio, setCourseBio] = useState("");
  const [courseImage, setCourseImage] = useState(null);

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

        const studentsRes = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}courses/getStudents/${courseId}`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log(studentsRes.data);
        dispatch(usersActions.setData(studentsRes.data));
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

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

      {levelsNum !== 0 ? (
        <div className={classes.courseLevels}>
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

      <div className={classes.courseStudents}>
        {studentsNum !== 0 && (
          <div className={classes.courseStudentsList}>
            {students.map((item, index) => (
              <User
                key={index}
                token={token}
                id={item.id}
                userName={item.username}
                avatar={item.profilePic}
                bio={item.bio}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDataShow;

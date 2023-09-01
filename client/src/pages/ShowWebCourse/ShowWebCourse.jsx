import { React, useState, useEffect } from "react";
import classes from "./ShowWebCourse.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ShowWebCourse = ({ token }) => {
  const params = useParams();
  const courseId = params.courseId;

  const navigate = useNavigate();

  const [courseName, setCourseName] = useState("");
  const [courseBio, setCourseBio] = useState("");
  const [courseQuestion, setCourseQuestion] = useState(null);
  const [courseTaken, setCourseTaken] = useState(false);
  const [isExam, setIsExam] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const docsRes = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}webCourses/getCourse/${courseId}`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log(docsRes);

        setCourseName(docsRes.data.title);
        setCourseBio(docsRes.data.abstract);
        setCourseQuestion(`
        <html>
          <body>${docsRes.data.html}</body>
          <style>${docsRes.data.css}</style>
          <script>${docsRes.data.javascript}</script>
        </html>
      `);
        setIsExam(docsRes.data.isExam);

        const isTakenRes = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}students/isWebCourseTaken/${courseId}`,
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
        `${process.env.REACT_APP_API_ADDRESS}students/takeWebCourse`,
        {
          courseId: courseId,
        },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      isExam
        ? navigate(`/takeWebExam/${courseId}`)
        : navigate(`/takeWebPractice/${courseId}`);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const continueCourse = async () => {
    isExam
      ? navigate(`/takeWebExam/${courseId}`)
      : navigate(`/takeWebPractice/${courseId}`);
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
        <div className={classes.enterCourseDetails}>
          <div className={classes.enterData}>
            <input value={courseName} type="text" readOnly />
            <span>Title</span>
          </div>
          <div className={classes.enterData}>
            <textarea value={courseBio} readOnly />
            <span>Abstract</span>
          </div>
        </div>
      </div>

      <div className={classes.courseImage}>
        <iframe
          srcDoc={courseQuestion}
          title="output"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
        />
      </div>

      <div className={classes.courseOptions}>
        {courseTaken ? (
          <>
            <button className={classes.logOut} onClick={logOut}>
              Log Out :(((
            </button>
            <button className={classes.continueCourse} onClick={continueCourse}>
              Continue
            </button>
          </>
        ) : (
          <button className={classes.takeCourse} onClick={takeCourse}>
            Take the Course :)))
          </button>
        )}
      </div>
    </div>
  );
};

export default ShowWebCourse;

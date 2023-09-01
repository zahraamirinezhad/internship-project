import { React, useState, useEffect } from "react";
import classes from "./WebCourseStatusShow.module.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { usersActions } from "../../store/users";
import User from "../../components/User/User";
import { Editor } from "../../components";

const WebCourseStatusShow = ({ token }) => {
  const params = useParams();
  const courseId = params.webCourseId;

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const usersNum = useSelector((state) => state.users.usersNum);

  const [courseName, setCourseName] = useState("");
  const [courseBio, setCourseBio] = useState("");
  const [courseQuestion, setCourseQuestion] = useState(null);
  const [showStudent, setShowStudent] = useState(false);
  const [student, setStudent] = useState(null);

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

        const studentsRes = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}webCourses/getStudents/${courseId}`,
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

  const showStudentScore = async (firstName, lastName, studentNumber, id) => {
    try {
      const studentsRes = await axios.post(
        `${process.env.REACT_APP_API_ADDRESS}students/getWebExamAnswer`,
        { studentId: id, courseId: courseId },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(studentsRes.data);
      setStudent({
        firstName: firstName,
        lastName: lastName,
        studentNumber: studentNumber,
        html: studentsRes.data.html,
        css: studentsRes.data.css,
        javascript: studentsRes.data.javascript,
        answer: `
        <html>
          <body>${studentsRes.data.html}</body>
          <style>${studentsRes.data.css}</style>
          <script>${studentsRes.data.javascript}</script>
        </html>
      `,
      });
      setShowStudent(true);
    } catch (err) {
      console.log(err);
    }
  };

  const hideStudentScore = () => {
    console.log("hide");
    setShowStudent(false);
  };

  return (
    <div className={classes.container}>
      {showStudent && (
        <div className={classes.studentScore}>
          <div className={classes.studentData}>
            <div className={classes.enteredData}>
              <input type="text" readOnly value={student.firstName} />
              <span>First Name</span>
            </div>
            <div className={classes.enteredData}>
              <input type="text" readOnly value={student.lastName} />
              <span>Last Name</span>
            </div>
            <div className={classes.enteredData}>
              <input type="text" readOnly value={student.studentNumber} />
              <span>Student Number</span>
            </div>
            <div className={classes.studentCode}>
              <div className={classes.ide}>
                <div className={classes.editors}>
                  <Editor
                    value={student.html}
                    mode="html"
                    theme={"monokai"}
                    size="small"
                  />
                  <Editor
                    value={student.css}
                    mode="css"
                    theme={"monokai"}
                    size="small"
                  />
                  <Editor
                    value={student.javascript}
                    mode="javascript"
                    theme={"monokai"}
                    size="small"
                  />
                </div>
                <div className={classes.result}>
                  <iframe
                    className={classes.resData}
                    srcDoc={student.answer}
                    title="output"
                    sandbox="allow-scripts"
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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

      <h1 className={classes.title}>Students</h1>
      <div className={classes.levelsStatus}>
        {usersNum !== 0 ? (
          <div className={classes.levels}>
            {users.map((item, index) => (
              <User
                key={index}
                id={item.id}
                token={token}
                firstName={item.firstName}
                lastName={item.lastName}
                studentNumber={item.studentNumber}
                userName={item.username}
                avatar={item.profilePic}
                bio={item.bio}
                showStudentScore={showStudentScore}
              />
            ))}
          </div>
        ) : (
          <p className={classes.empty}>No Levels</p>
        )}
      </div>
    </div>
  );
};

export default WebCourseStatusShow;

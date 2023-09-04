import React, { useEffect, useState } from "react";
import { Editor } from "../../components";
import classes from "./StudentWebCourseScore.module.scss";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { CropRotate } from "@mui/icons-material";

const StudentWebCourseScore = ({ token }) => {
  const params = useParams();
  const courseId = params.courseId;
  const studentId = params.studentId;

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [javascript, setJavascript] = useState("");
  const [answer, setAnswer] = useState("");
  const [editorTheme, setEditorTheme] = useState("monokai");
  const [rotate, setRotate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [examScore, setExamScore] = useState(0);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_ADDRESS}students/getWebExamAnswer`,
          { studentId: studentId, courseId: courseId },
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data);
        setFirstName(res.data.Student.firstName);
        setLastName(res.data.Student.lastName);
        setStudentNumber(res.data.Student.studentNumber);
        setHtml(res.data.html);
        setCss(res.data.css);
        setJavascript(res.data.javascript);
        setAnswer(`
        <html>
          <body>${res.data.html}</body>
          <style>${res.data.css}</style>
          <script>${res.data.javascript}</script>
        </html>
      `);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  const setScore = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ADDRESS}webCourses/check/${studentId}/${courseId}`,
        { score: examScore },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      navigate(-1);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.studentScore}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className={classes.studentData}>
          <div className={classes.enteredData}>
            <input type="text" readOnly value={firstName} />
            <span>First Name</span>
          </div>
          <div className={classes.enteredData}>
            <input type="text" readOnly value={lastName} />
            <span>Last Name</span>
          </div>
          <div className={classes.enteredData}>
            <input type="text" readOnly value={studentNumber} />
            <span>Student Number</span>
          </div>
          <div className={classes.studentCode}>
            <div className={classes.ide}>
              <div className={classes.navbarContainer}>
                <ul className={classes.navbar}>
                  <li className={classes.rotateEditor}>
                    <button
                      onClick={() => {
                        setRotate(!rotate);
                      }}
                    >
                      <CropRotate />
                    </button>
                  </li>
                  <li className={classes.theme}>
                    <select
                      name="theme"
                      id="theme"
                      onChange={(e) => {
                        setEditorTheme(e.target.value);
                      }}
                    >
                      <option value="monokai">monokai</option>
                      <option value="github">github</option>
                      <option value="tomorrow">tomorrow</option>
                      <option value="twilight">twilight</option>
                      <option value="xcode">xcode</option>
                      <option value="textmate">textmate</option>
                      <option value="solarized_dark">solarized_dark</option>
                      <option value="solarized_light">solarized_light</option>
                      <option value="terminal">terminal</option>
                    </select>
                  </li>
                </ul>
              </div>
              <div className={`${classes.ide} ${rotate && classes.rotate}`}>
                <div className={classes.editors}>
                  <Editor
                    value={html}
                    mode="html"
                    theme={editorTheme}
                    size="small"
                  />
                  <Editor
                    value={css}
                    mode="css"
                    theme={editorTheme}
                    size="small"
                  />
                  <Editor
                    value={javascript}
                    mode="javascript"
                    theme={editorTheme}
                    size="small"
                  />
                </div>
                <div className={classes.result}>
                  <iframe
                    className={classes.resData}
                    srcDoc={answer}
                    title="output"
                    sandbox="allow-scripts"
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>
              <div className={classes.setScore}>
                <input
                  type="number"
                  min={0}
                  max={20}
                  onChange={(e) => {
                    setExamScore(e.target.value);
                  }}
                  placeholder="score"
                />
                <button onClick={setScore}>Exam Checked</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentWebCourseScore;

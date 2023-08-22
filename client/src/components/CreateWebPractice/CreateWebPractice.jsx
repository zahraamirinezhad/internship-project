import React, { useState } from "react";
import { Editor } from "../../components";
import classes from "./CreateWebPractice.module.scss";
import axios from "axios";
import FilterIcon from "../../images/filter.png";
import WebLanSmallMenu from "../../components/SmallMenus/WebLanSmallMenu/WebLanSmallMenu";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

const CreateWebPractice = ({ token }) => {
  const navigate = useNavigate();

  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [javascript, setJavascript] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [editorTheme, setEditorTheme] = useState("monokai");
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseBio, setCourseBio] = useState("");

  const [isCompiling, setIsCompiling] = useState(false);
  const [dataComplete, setDataComplete] = useState(false);

  const clear = () => {
    setHtml("");
    setCss("");
    setJavascript("");
    setSrcDoc("");
  };

  const runCode = () => {
    setIsCompiling(true);
    setSrcDoc(`
          <html>
            <body>${html}</body>
            <style>${css}</style>
            <script>${javascript}</script>
          </html>
        `);
    setIsCompiling(false);
  };

  const showMenuHandler = () => {
    setIsShowMenu(!isShowMenu);
  };

  const createNewCourse = async () => {
    if (courseName !== "" && courseBio !== "") {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_ADDRESS}webCourses/create`,
          {
            title: courseName,
            abstract: courseBio,
            html: html,
            css: css,
            javascript: javascript,
            isExam: false,
          },
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        navigate("/profileStructure/whichPractice");
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    } else {
      setDataComplete(true);
    }
  };

  return (
    <div className={classes.container}>
      <h2>Create New Web Practice</h2>
      <div className={classes.courseDetails}>
        <div className={classes.enterCourseDetails}>
          <div className={classes.enterData}>
            <input
              type="text"
              onChange={(e) => {
                setCourseName(e.target.value);
              }}
              required
            />
            <span>Title</span>
          </div>
          <div className={classes.enterData}>
            <textarea
              onChange={(e) => {
                setCourseBio(e.target.value);
              }}
              required
            />
            <span>Abstract</span>
          </div>
        </div>
      </div>
      <div className={classes.navbarContainer}>
        <div className={classes.smallMenu}>
          <button onClick={showMenuHandler} className={classes.showMenu}>
            <img src={FilterIcon} alt="options" />
          </button>
          <WebLanSmallMenu
            isShowMenu={isShowMenu}
            clear={clear}
            setEditorTheme={setEditorTheme}
            runCode={runCode}
          />
        </div>
        <ul className={classes.navbar}>
          <li className={classes.run}>
            <button onClick={runCode}>Run</button>
          </li>
          <li className={classes.clear}>
            <button onClick={clear}>Clear</button>
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
      <div className={classes.ide}>
        <div className={classes.editors}>
          <Editor
            value={html}
            mode="html"
            setVal={setHtml}
            theme={editorTheme}
            size="small"
          />
          <Editor
            value={css}
            mode="css"
            setVal={setCss}
            theme={editorTheme}
            size="small"
          />
          <Editor
            value={javascript}
            mode="javascript"
            setVal={setJavascript}
            theme={editorTheme}
            size="small"
          />
        </div>
        <div className={classes.result}>
          {isCompiling && (
            <div className={classes.loading}>
              <CircularProgress />
            </div>
          )}
          <iframe
            className={classes.resData}
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            width="100%"
            height="100%"
          />
        </div>
      </div>
      <button className={classes.finishCreatingExam} onClick={createNewCourse}>
        Finish Creating Practice
      </button>
      <Snackbar
        open={dataComplete}
        autoHideDuration={2000}
        onClose={() => {
          setDataComplete(false);
        }}
      >
        <Alert
          variant="filled"
          severity="error"
          onClose={() => {
            setDataComplete(false);
          }}
          sx={{ width: "100%" }}
        >
          Please Fill the Form Completely
        </Alert>
      </Snackbar>
    </div>
  );
};
export default CreateWebPractice;

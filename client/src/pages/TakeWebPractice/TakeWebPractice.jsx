import { React, useEffect, useState } from "react";
import classes from "./TakeWebPractice.module.scss";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Editor } from "../../components";
import { CropRotate } from "@mui/icons-material";
import FilterIcon from "../../images/filter.png";
import WebLanSmallMenu from "../../components/SmallMenus/WebLanSmallMenu/WebLanSmallMenu";

const TakeWebPractice = ({ token }) => {
  const params = useParams();
  const courseId = params.courseId;

  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [javascript, setJavascript] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [editorTheme, setEditorTheme] = useState("monokai");
  const [rotate, setRotate] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState(false);

  const [finalScore, setFinalScore] = useState(0);

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

        setQuestion(docsRes.data.question);

        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  const finishExam = async () => {
    try {
      const answer = `
          <html>
            <body>${html}</body>
            <style>${css}</style>
            <script>${javascript}</script>
          </html>
        `;

      console.log(question);
      console.log(answer);
      const res = await axios.post(
        `${process.env.REACT_APP_API_ADDRESS}webCourses/check/${courseId}`,
        { question: question, answer: answer },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

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

  return (
    <div className={classes.container}>
      <div className={classes.container}>
        <div className={classes.navbarContainer}>
          <div className={classes.smallMenu}>
            <button onClick={showMenuHandler} className={classes.showMenu}>
              <img src={FilterIcon} alt="options" />
            </button>
            <WebLanSmallMenu
              isShowMenu={isShowMenu}
              rotate={rotate}
              setRotate={setRotate}
              clear={clear}
              setEditorTheme={setEditorTheme}
              runCode={runCode}
            />
          </div>
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
        <div className={`${classes.ide} ${rotate && classes.rotate}`}>
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
      </div>
      <div className={classes.answer}>
        <iframe
          className={classes.resData}
          srcDoc={question}
          title="output"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
        />
      </div>
      <div className={classes.options}>
        {/* <Link to={`/showCourse/${courseId}`}> */}
        <button onClick={finishExam}>Finish Exam</button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default TakeWebPractice;

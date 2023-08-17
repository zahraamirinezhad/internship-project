import React, { useState } from "react";
import { Editor } from "../../components";
import classes from "./PracticeWebLan.module.scss";
import { CropRotate } from "@mui/icons-material";
import FilterIcon from "../../images/filter.png";
import WebLanSmallMenu from "../../components/SmallMenus/WebLanSmallMenu/WebLanSmallMenu";
import { CircularProgress } from "@mui/material";

const PracticeWebLan = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [javascript, setJavascript] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [editorTheme, setEditorTheme] = useState("monokai");
  const [rotate, setRotate] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);

  const [isCompiling, setIsCompiling] = useState(false);

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
  );
};
export default PracticeWebLan;

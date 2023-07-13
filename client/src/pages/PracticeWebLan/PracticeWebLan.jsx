import React, { useState } from "react";
import { Editor } from "../../components";
import classes from "./PracticeWebLan.module.scss";
import { CropRotate } from "@mui/icons-material";

const PracticeWebLan = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [javascript, setJavascript] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [editorTheme, setEditorTheme] = useState("monokai");
  const [rotate, setRotate] = useState(false);

  const clear = () => {
    setHtml("");
    setCss("");
    setJavascript("");
    setSrcDoc("");
  };

  const runCode = () => {
    setSrcDoc(`
          <html>
            <body>${html}</body>
            <style>${css}</style>
            <script>${javascript}</script>
          </html>
        `);
  };

  return (
    <div className={classes.container}>
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
      <div className={`${classes.ide} ${rotate && classes.rotate}`}>
        <div className={classes.editors}>
          <Editor
            value={html}
            mode="html"
            setVal={setHtml}
            theme={editorTheme}
          />
          <Editor value={css} mode="css" setVal={setCss} theme={editorTheme} />
          <Editor
            value={javascript}
            mode="javascript"
            setVal={setJavascript}
            theme={editorTheme}
          />
        </div>
        <div className={classes.result}>
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
            className="full-screenable-node"
          />
        </div>
      </div>
    </div>
  );
};
export default PracticeWebLan;

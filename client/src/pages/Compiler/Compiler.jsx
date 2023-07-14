import React, { useState } from "react";
import classes from "./Compiler.module.scss";
import { CropRotate } from "@mui/icons-material";
import { Editor } from "../../components";
import axios from "axios";
import FilterIcon from "../../images/filter.png";
import CompilerSmallMenu from "../../components/SmallMenus/CompilerSmallMenu/CompilerSmallMenu";

function Compiler({ token }) {
  const [editorValue, setEditorValue] = useState("");
  const [editorTheme, setEditorTheme] = useState("monokai");
  const [editorLan, setEditorLan] = useState("python");
  const [compileRes, setCompileRes] = useState("");
  const [compileError, setCompileError] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);

  const compile = () => {
    if (editorValue !== "") {
      let lan = "";

      switch (editorLan) {
        case "python":
          lan = "py";
          break;
        case "javascript":
          lan = "js";
          break;
        default:
          lan = "";
      }

      try {
        const compileCode = async () => {
          const res = await axios.post(
            `${process.env.REACT_APP_API_ADDRESS}compile/compileCode`,
            {
              language: lan,
              code: editorValue,
            },
            {
              headers: {
                token: `Bearer ${token}`,
              },
            }
          );
          console.log(res);
          setCompileRes(res.data.result);
          setCompileError(res.data.errorHappened);
        };
        compileCode();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const showMenuHandler = () => {
    setIsShowMenu(!isShowMenu);
  };

  return (
    <div className={classes.container}>
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
          <li className={classes.run}>
            <button onClick={compile}>Run</button>
          </li>
          <li className={classes.clear}>
            <button onClick={() => setEditorValue("")}>Clear</button>
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
          <li className={classes.lan}>
            <select
              name="editorLan"
              id="editorLan"
              onChange={(e) => {
                setEditorLan(e.target.value);
              }}
            >
              <option value="python">Python</option>
              <option value="javascript">Node.js</option>
            </select>
          </li>
        </ul>
        <div className={classes.smallMenu}>
          <button onClick={showMenuHandler} className={classes.showMenu}>
            <img src={FilterIcon} alt="options" />
          </button>
          <CompilerSmallMenu
            isShowMenu={isShowMenu}
            setEditorValue={setEditorValue}
            setEditorLan={setEditorLan}
            setEditorTheme={setEditorTheme}
            compile={compile}
          />
        </div>
      </div>
      <div className={`${classes.ide} ${rotate && classes.rotate}`}>
        <Editor
          value={editorValue}
          mode={editorLan}
          theme={editorTheme}
          setVal={setEditorValue}
          fontSize={14}
        />
        <p
          className={`${classes.compileResult} ${
            compileError && classes.error
          }`}
        >
          {compileRes}
        </p>
      </div>
    </div>
  );
}

export default Compiler;

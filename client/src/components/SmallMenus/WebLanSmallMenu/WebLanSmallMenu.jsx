import React from "react";
import classes from "./WebLanSmallMenu.module.scss";

const WebLanSmallMenu = ({ isShowMenu, clear, setEditorTheme, runCode }) => {
  return (
    <div
      className={`${classes.container} ${
        isShowMenu ? classes.visible : classes.invisible
      }`}
    >
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
  );
};

export default WebLanSmallMenu;

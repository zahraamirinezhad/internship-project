import React from "react";
import AceEditor from "react-ace";
import classes from "./Editor.module.scss";

import "ace-builds/src-noconflict/ace";
// import "ace-builds/webpack-resolver";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-terminal";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-html";
// import "ace-builds/src/worker-javascript.js";
// import "ace-builds/src/worker-css.js";
// import "ace-builds/src/worker-html.js";

const Editor = ({ value, mode, setVal, theme }) => {
  return (
    <AceEditor
      className={classes.editor}
      placeholder={mode}
      value={value}
      mode={mode}
      theme={theme}
      onChange={(val) => {
        setVal(val);
      }}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
        useWorker: false,
      }}
    />
  );
};

export default Editor;

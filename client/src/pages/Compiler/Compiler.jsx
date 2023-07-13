import React, { useState } from "react";
import classes from "./Compiler.module.scss";
import { CropRotate } from "@mui/icons-material";
import AceEditor from "react-ace";
// import "brace/theme/monokai";
// import "brace/theme/github";
// import "brace/theme/tomorrow";
// import "brace/theme/twilight";
// import "brace/theme/xcode";
// import "brace/theme/textmate";
// import "brace/theme/solarized_dark";
// import "brace/theme/solarized_light";
// import "brace/theme/terminal";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-terminal";
import axios from "axios";
// import "brace/mode/ada";
// import "brace/mode/apache_conf";
// import "brace/mode/applescript";
// import "brace/mode/asciidoc";
// import "brace/mode/assembly_x86";
// import "brace/mode/autohotkey";
// import "brace/mode/batchfile";
// import "brace/mode/bro";
// import "brace/mode/c9search";
// import "brace/mode/c_cpp";
// import "brace/mode/cirru";
// import "brace/mode/clojure";
// import "brace/mode/cobol";
// import "brace/mode/coffee";
// import "brace/mode/coldfusion";
// import "brace/mode/csharp";
// import "brace/mode/css";
// import "brace/mode/curly";
// import "brace/mode/dart";
// import "brace/mode/django";
// import "brace/mode/d";
// import "brace/mode/dockerfile";
// import "brace/mode/dot";
// import "brace/mode/drools";
// import "brace/mode/eiffel";
// import "brace/mode/ejs";
// import "brace/mode/elixir";
// import "brace/mode/elm";
// import "brace/mode/erlang";
// import "brace/mode/forth";
// import "brace/mode/fortran";
// import "brace/mode/ftl";
// import "brace/mode/gcode";
// import "brace/mode/gherkin";
// import "brace/mode/gitignore";
// import "brace/mode/glsl";
// import "brace/mode/gobstones";
// import "brace/mode/golang";
// import "brace/mode/groovy";
// import "brace/mode/haml";
// import "brace/mode/handlebars";
// import "brace/mode/haskell_cabal";
// import "brace/mode/haskell";
// import "brace/mode/haxe";
// import "brace/mode/hjson";
// import "brace/mode/html_elixir";
// import "brace/mode/html";
// import "brace/mode/html_ruby";
// import "brace/mode/ini";
// import "brace/mode/io";
// import "brace/mode/jack";
// import "brace/mode/jade";
// import "brace/mode/java";
// import "brace/mode/javascript";
// import "brace/mode/jsoniq";
// import "brace/mode/json";
// import "brace/mode/jsp";
// import "brace/mode/jsx";
// import "brace/mode/julia";
// import "brace/mode/kotlin";
// import "brace/mode/latex";
// import "brace/mode/less";
// import "brace/mode/liquid";
// import "brace/mode/lisp";
// import "brace/mode/logiql";
// import "brace/mode/lsl";
// import "brace/mode/lua";
// import "brace/mode/luapage";
// import "brace/mode/lucene";
// import "brace/mode/makefile";
// import "brace/mode/markdown";
// import "brace/mode/mask";
// import "brace/mode/matlab";
// import "brace/mode/maze";
// import "brace/mode/mel";
// import "brace/mode/mushcode";
// import "brace/mode/mysql";
// import "brace/mode/nix";
// import "brace/mode/nsis";
// import "brace/mode/objectivec";
// import "brace/mode/ocaml";
// import "brace/mode/pascal";
// import "brace/mode/perl";
// import "brace/mode/pgsql";
// import "brace/mode/php";
// import "brace/mode/powershell";
// import "brace/mode/praat";
// import "brace/mode/prolog";
// import "brace/mode/properties";
// import "brace/mode/protobuf";
// import "brace/mode/python";
// import "brace/mode/razor";
// import "brace/mode/rdoc";
// import "brace/mode/rhtml";
// import "brace/mode/r";
// import "brace/mode/rst";
// import "brace/mode/ruby";
// import "brace/mode/rust";
// import "brace/mode/sass";
// import "brace/mode/scad";
// import "brace/mode/scala";
// import "brace/mode/scheme";
// import "brace/mode/scss";
// import "brace/mode/sh";
// import "brace/mode/sjs";
// import "brace/mode/smarty";
// import "brace/mode/snippets";
// import "brace/mode/soy_template";
// import "brace/mode/space";
// import "brace/mode/sql";
// import "brace/mode/sqlserver";
// import "brace/mode/stylus";
// import "brace/mode/svg";
// import "brace/mode/swift";
// import "brace/mode/tcl";
// import "brace/mode/tex";
// import "brace/mode/textile";
// import "brace/mode/toml";
// import "brace/mode/tsx";
// import "brace/mode/twig";
// import "brace/mode/typescript";
// import "brace/mode/vala";
// import "brace/mode/vbscript";
// import "brace/mode/velocity";
// import "brace/mode/verilog";
// import "brace/mode/vhdl";
// import "brace/mode/wollok";
// import "brace/mode/xml";
// import "brace/mode/xquery";
// import "brace/mode/yaml";
// import "brace/mode/abap";
// import "brace/mode/abc";
// import "brace/mode/actionscript";
// import "brace/mode/lean";
// import "brace/mode/live_script";
// import "brace/mode/livescript";
// import "brace/mode/mavens_mate_log";
// import "brace/mode/mips_assembler";
// import "brace/mode/mipsassembler";
// import "brace/mode/swig";
// import "brace/mode/diff";
// import "brace/mode/plain_text";
// import "brace/mode/text";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";

function Compiler({ token }) {
  const [editorValue, setEditorValue] = useState("");
  const [editorTheme, setEditorTheme] = useState("monokai");
  const [editorLan, setEditorLan] = useState("python");
  const [compileRes, setCompileRes] = useState("");
  const [compileError, setCompileError] = useState(false);
  const [rotate, setRotate] = useState(false);

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
      <div className={`${classes.ide} ${rotate && classes.rotate}`}>
        <AceEditor
          className={classes.editor}
          value={editorValue}
          mode={editorLan}
          theme={editorTheme}
          onChange={(val) => {
            setEditorValue(val);
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
          }}
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

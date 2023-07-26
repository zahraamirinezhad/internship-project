import { React, useState } from "react";
import classes from "./QuizeBlankSpace.module.scss";
import { useDispatch } from "react-redux";
import { choicesActions } from "../../store/choices";

const QuizeBlankSpace = () => {
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState("");

  const handleDrop = (e) => {
    e.preventDefault();

    console.log(e);
    console.log(e.dataTransfer.getData("answer"));
    if (answer === "") {
      console.log(1);
      setAnswer(e.dataTransfer.getData("answer"));
      dispatch(
        choicesActions.deleteChoice({
          choice: e.dataTransfer.getData("answer"),
        })
      );
    } else {
      console.log(1);
      dispatch(choicesActions.addChoice({ choice: answer }));
      setAnswer(e.dataTransfer.getData("answer"));
      dispatch(
        choicesActions.deleteChoice({
          choice: e.dataTransfer.getData("answer"),
        })
      );
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        handleDrop(e);
      }}
      className={classes.container}
    >
      <p>{answer}</p>
    </div>
  );
};

export default QuizeBlankSpace;

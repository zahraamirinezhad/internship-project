import React from "react";
import classes from "./QuizeChoice.module.scss";

const QuizeChoice = ({ answer }) => {
  const handleDrag = (e) => {
    console.log(e);
    e.dataTransfer.setData("answer", answer);
  };

  return (
    <div
      draggable
      onDragStart={(e) => {
        handleDrag(e);
      }}
      className={classes.container}
    >
      <p>{answer}</p>
    </div>
  );
};

export default QuizeChoice;

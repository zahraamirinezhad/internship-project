import { React } from "react";
import classes from "./QuizeBlankSpace.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { choicesActions } from "../../store/choices";
import { selectedAnswersActions } from "../../store/selectedAnswers";

const QuizeBlankSpace = ({ index, ans }) => {
  const dispatch = useDispatch();

  const selectedAnswers = useSelector(
    (state) => state.selectedAnswers.selectedAnswers
  );
  const selectedAnswersNum = useSelector(
    (state) => state.selectedAnswers.selectedAnswersNum
  );

  const handleDrop = (e) => {
    e.preventDefault();

    dispatch(
      selectedAnswersActions.addSelectedAnswers({
        index: index,
        selectedAnswer: e.dataTransfer.getData("answer"),
      })
    );

    console.log(e);
    console.log(e.dataTransfer.getData("answer"));
    if (getAnswer(index) === "") {
      console.log(1);
      dispatch(
        choicesActions.deleteChoice({
          choice: e.dataTransfer.getData("answer"),
        })
      );
    } else {
      console.log(1);
      dispatch(
        choicesActions.addChoice({ choice: e.dataTransfer.getData("answer") })
      );
      dispatch(
        choicesActions.deleteChoice({
          choice: e.dataTransfer.getData("answer"),
        })
      );
    }
  };

  const getAnswer = (index) => {
    for (let i = 0; i < selectedAnswersNum; i++) {
      if (selectedAnswers[i].index === index)
        return selectedAnswers[i].selectedAnswer;
    }
    return "";
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
      <p>{getAnswer(index)}</p>
    </div>
  );
};

export default QuizeBlankSpace;

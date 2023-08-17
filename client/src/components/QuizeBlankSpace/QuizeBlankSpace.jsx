import { React } from "react";
import classes from "./QuizeBlankSpace.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { choicesActions } from "../../store/choices";
import { selectedAnswersActions } from "../../store/selectedAnswers";

const QuizeBlankSpace = ({ index }) => {
  const dispatch = useDispatch();

  const selectedAnswers = useSelector(
    (state) => state.selectedAnswers.selectedAnswers
  );
  const selectedAnswersNum = useSelector(
    (state) => state.selectedAnswers.selectedAnswersNum
  );

  const handleDrop = (e) => {
    e.preventDefault();

    const currentAnswer = getAnswer(index);

    dispatch(
      selectedAnswersActions.addSelectedAnswers({
        index: index,
        selectedAnswer: e.dataTransfer.getData("answer"),
      })
    );

    if (getAnswer(index) === "") {
      dispatch(
        choicesActions.deleteChoice({
          choice: e.dataTransfer.getData("answer"),
        })
      );
    } else {
      dispatch(choicesActions.addChoice({ choice: currentAnswer }));
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

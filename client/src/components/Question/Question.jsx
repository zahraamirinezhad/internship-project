import React from "react";
import classes from "./Question.module.scss";
import { Delete, Edit } from "@mui/icons-material";
import { questionsActions } from "../../store/questions";
import { choicesActions } from "../../store/choices";
import { useDispatch } from "react-redux";

const Question = ({
  question,
  fullAnswer,
  choices,
  setQuestion,
  setAnswer,
}) => {
  const dispatch = useDispatch();

  const manageEdit = () => {
    setQuestion(question);
    setAnswer(fullAnswer);
    dispatch(choicesActions.setMulChoices(choices));
    dispatch(questionsActions.deleteQuestion({ question: question }));
  };

  const manageDelete = () => {
    dispatch(questionsActions.deleteQuestion({ question: question }));
  };

  return (
    <div className={classes.container}>
      <div className={classes.options}>
        <button className={classes.delete} onClick={manageDelete}>
          <Delete />
        </button>
        <button className={classes.edit} onClick={manageEdit}>
          <Edit />
        </button>
      </div>
      <p>{question}</p>
    </div>
  );
};

export default Question;

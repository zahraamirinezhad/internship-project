import React from "react";
import classes from "./Level.module.scss";
import { Delete, Edit } from "@mui/icons-material";
import { questionsActions } from "../../store/questions";
import { choicesActions } from "../../store/choices";
import { useDispatch } from "react-redux";
import { levelsActions } from "../../store/levels";

const Level = ({
  title,
  doc,
  desc,
  questions,
  setTitle,
  setDoc,
  setDocDisplay,
  setDesc,
}) => {
  const dispatch = useDispatch();

  const manageEdit = () => {
    setTitle(title);
    setDoc(doc);
    console.log(typeof doc);
    console.log(typeof doc === "string");
    setDocDisplay(
      typeof doc === "string"
        ? `http://localhost:8800/${doc}`
        : URL.createObjectURL(doc)
    );
    setDesc(desc);
    dispatch(questionsActions.deleteAllQuestions());
    dispatch(choicesActions.deleteAllChoices());
    for (let i = 0; i < questions.length; i++) {
      dispatch(
        questionsActions.addQuestion({
          question: questions[i].question.question,
          fullAnswer: questions[i].question.fullAnswer,
          choices: questions[i].choices,
        })
      );
    }
    dispatch(levelsActions.deleteLevel({ title: title }));
  };

  const manageDelete = () => {
    dispatch(levelsActions.deleteLevel({ title: title }));
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
      <p>{title}</p>
    </div>
  );
};

export default Level;

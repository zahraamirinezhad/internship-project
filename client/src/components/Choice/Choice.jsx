import React from "react";
import classes from "./Choice.module.scss";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { choicesActions } from "../../store/choices";

const Choice = ({ answer, setChoice }) => {
  const dispatch = useDispatch();

  const manageEdit = () => {
    setChoice(answer);
    dispatch(choicesActions.deletechoice({ name: answer }));
  };

  const manageDelete = () => {
    dispatch(choicesActions.deletechoice({ name: answer }));
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
      <p>{answer}</p>
    </div>
  );
};

export default Choice;

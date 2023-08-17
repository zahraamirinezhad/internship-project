import { React, useEffect, useState } from "react";
import classes from "./TakeCourse.module.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { questionsActions } from "../../store/questions";
import axios from "axios";
import { LinearProgress, CircularProgress } from "@mui/material";
import QuizeChoice from "../../components/QuizeChoice/QuizeChoice";
import QuizeBlankSpace from "../../components/QuizeBlankSpace/QuizeBlankSpace";
import reactStringReplace from "react-string-replace";
import { choicesActions } from "../../store/choices";
import { selectedAnswersActions } from "../../store/selectedAnswers";
import { Snackbar, Alert } from "@mui/material";
import { Cofee } from "../../components";

const TakeCourse = ({ token }) => {
  const params = useParams();
  const levelId = params.levelId;

  const dispatch = useDispatch();

  const choices = useSelector((state) => state.choices.choices);
  const choicesNum = useSelector((state) => state.choices.choicesNum);

  const selectedAnswers = useSelector(
    (state) => state.selectedAnswers.selectedAnswers
  );
  const selectedAnswersNum = useSelector(
    (state) => state.selectedAnswers.selectedAnswersNum
  );

  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [answerRight, setAnswerRight] = useState(false);
  const [answerWrong, setAnswerWrong] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        dispatch(questionsActions.deleteAllQuestions());
        const levelRes = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}levels/getLevelQuestions/${levelId}`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log(levelRes);
        const questionsList = [];
        for (let i = 0; i < levelRes.data.length; i++) {
          questionsList.push({
            question: levelRes.data[i].question,
            fullAnswer: levelRes.data[i].fullAnswer,
            choices: levelRes.data[i].Choices,
          });
        }
        setQuestions(questionsList);
        setCurrentQuestion(levelRes.data[0]);
        dispatch(choicesActions.deleteAllChoices());
        dispatch(choicesActions.setMulChoices(levelRes.data[0].Choices));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  const next = () => {
    if (questionIndex < questions.length - 1) {
      setAnswerWrong(false);
      setAnswerRight(false);
      setQuestionIndex(questionIndex + 1);
      setCurrentQuestion(questions[questionIndex]);
      dispatch(choicesActions.deleteAllChoices());
      dispatch(choicesActions.setMulChoices(questions[questionIndex].choices));
      dispatch(selectedAnswersActions.deleteAllSelectedAnswers());
      console.log(currentQuestion);
    }
  };

  const back = () => {
    if (questionIndex > 0) {
      setAnswerWrong(false);
      setAnswerRight(false);
      setQuestionIndex(questionIndex - 1);
      setCurrentQuestion(questions[questionIndex]);
      dispatch(choicesActions.deleteAllChoices());
      dispatch(choicesActions.setMulChoices(questions[questionIndex].choices));
      dispatch(selectedAnswersActions.deleteAllSelectedAnswers());
      console.log(currentQuestion);
    }
  };

  const checkAnswer = () => {
    setAnswerWrong(false);
    setAnswerRight(false);

    const finalAnswerList = reactStringReplace(
      currentQuestion.question,
      "%_%",
      (match, i) => getAnswer(i)
    );

    console.log(finalAnswerList);

    let finalAnswer = "";
    finalAnswerList.map((x) => (finalAnswer += x));

    console.log(finalAnswer);
    if (finalAnswer !== currentQuestion.fullAnswer) {
      setAnswerWrong(true);
    } else {
      setAnswerRight(true);
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
    <div className={classes.container}>
      <div className={classes.courseStatus}>
        <LinearProgress
          variant="determinate"
          value={((questionIndex + 1) / questions.length) * 100}
        />
      </div>
      <div className={classes.courseQuestion}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <div className={classes.questionBox}>
            <span className={classes.border}></span>
            <span className={classes.border}></span>
            <span className={classes.border}></span>
            <span className={classes.border}></span>
            <div className={classes.question}>
              {reactStringReplace(
                currentQuestion.question,
                "%_%",
                (match, i) => (
                  <QuizeBlankSpace index={i} ans="" />
                )
              )}
            </div>
            <div className={classes.choices}>
              {choices.map((item, index) => (
                <QuizeChoice key={index} answer={item.choice} />
              ))}
            </div>
          </div>
        )}
        <Cofee />
      </div>
      <div className={classes.options}>
        <button onClick={back}>Back</button>

        {!answerRight ? (
          <button onClick={checkAnswer}>Check</button>
        ) : (
          <button onClick={next}>Next</button>
        )}
      </div>
      <Snackbar open={answerWrong}>
        <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
          WRONG ANSWER :((
        </Alert>
      </Snackbar>
      <Snackbar open={answerRight}>
        <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
          CONGRATULATIONS :))
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TakeCourse;

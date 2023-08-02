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
  const courseId = params.courseId;

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
        const questionRes = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}courses/getCourseQuestions/${courseId}`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log(questionRes);
        const questionsList = [];
        for (let i = 0; i < questionRes.data.Questions.length; i++) {
          const choiceRes = await axios.get(
            `${process.env.REACT_APP_API_ADDRESS}courses/getCourseQuestionsChoices/${questionRes.data.Questions[i].id}`,
            {
              headers: {
                token: `Bearer ${token}`,
              },
            }
          );
          console.log(choiceRes);
          questionsList.push({
            question: choiceRes.data.question,
            fullAnswer: choiceRes.data.fullAnswer,
            choices: choiceRes.data.Choices,
          });
        }
        setQuestions(questionsList);
        setCurrentQuestion(questionsList[0]);
        dispatch(choicesActions.deleteAllChoices());
        dispatch(choicesActions.setMulChoices(questionsList[0].choices));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  const next = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setCurrentQuestion(questions[questionIndex + 1]);
      dispatch(choicesActions.deleteAllChoices());
      dispatch(
        choicesActions.setMulChoices(questions[questionIndex + 1].choices)
      );
      dispatch(selectedAnswersActions.deleteAllSelectedAnswers());
      console.log(currentQuestion);
    }
  };

  const back = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      setCurrentQuestion(questions[questionIndex - 1]);
      dispatch(choicesActions.deleteAllChoices());
      dispatch(
        choicesActions.setMulChoices(questions[questionIndex + 1].choices)
      );
      dispatch(selectedAnswersActions.deleteAllSelectedAnswers());
      console.log(currentQuestion);
    }
  };

  const checkAnswer = () => {
    console.log(selectedAnswers);

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
      next();
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
                <QuizeChoice answer={item.choice} />
              ))}
            </div>
          </div>
        )}
        <Cofee />
      </div>
      <div className={classes.options}>
        <button onClick={back}>Back</button>

        <button onClick={checkAnswer}>Check</button>

        {answerRight && (
          <button disabled={answerRight} onClick={next}>
            Next
          </button>
        )}
      </div>
      <Snackbar
        open={answerWrong}
        autoHideDuration={2000}
        onClose={() => {
          setAnswerWrong(false);
        }}
      >
        <Alert
          variant="filled"
          severity="error"
          onClose={() => {
            setAnswerWrong(false);
          }}
          sx={{ width: "100%" }}
        >
          WRONG ANSWER :((
        </Alert>
      </Snackbar>
      <Snackbar
        open={answerRight}
        autoHideDuration={2000}
        onClose={() => {
          setAnswerRight(false);
        }}
      >
        <Alert
          variant="filled"
          severity="success"
          onClose={() => {
            setAnswerRight(false);
          }}
          sx={{ width: "100%" }}
        >
          CONGRATULATIONS :))
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TakeCourse;

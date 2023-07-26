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

const TakeCourse = ({ token }) => {
  const params = useParams();
  const courseId = params.courseId;

  const dispatch = useDispatch();
  // const questions = useSelector((state) => state.questions.questions);
  // const questionsNum = useSelector((state) => state.questions.questionsNum);

  const choices = useSelector((state) => state.choices.choices);
  const choicesNum = useSelector((state) => state.choices.choicesNum);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

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
          // dispatch(
          //   questionsActions.addQuestion({
          //     index: i + 1,
          //     question: choiceRes.data.question,
          //     fullAnswer: choiceRes.data.fullAnswer,
          //     choices: choiceRes.data.Choices,
          //   })
          // );
          questions.push({
            question: choiceRes.data.question,
            fullAnswer: choiceRes.data.fullAnswer,
            choices: choiceRes.data.Choices,
          });
        }
        setCurrentQuestion(questions[0]);
        dispatch(choicesActions.deleteAllChoices());
        dispatch(choicesActions.setMulChoices(questions[0].choices));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  const getQuestion = () => {
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].index === questionIndex) {
        setCurrentQuestion(questions[i]);
        break;
      }
    }
  };

  const next = () => {
    if (questionIndex !== questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      getQuestion();
    }
  };

  const back = () => {
    if (questionIndex !== 0) {
      setQuestionIndex(questionIndex - 1);
      getQuestion();
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.courseStatus}>
        <LinearProgress variant="determinate" value={questionIndex + 1} />
      </div>
      <div className={classes.courseQuestion}>
        <div>
          <button onClick={back}>Back</button>
        </div>
        <div>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <div>
              {reactStringReplace(
                currentQuestion.question,
                "%_%",
                (match, i) => (
                  <QuizeBlankSpace />
                )
              )}
              <div>
                {choices.map((item, index) => (
                  <QuizeChoice answer={item.choice} />
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          <button onClick={next}>Next</button>
        </div>
      </div>
      <div className={classes.options}></div>
    </div>
  );
};

export default TakeCourse;

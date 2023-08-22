import { React, useEffect, useState } from "react";
import classes from "./TakeExam.module.scss";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { questionsActions } from "../../store/questions";
import axios from "axios";
import { LinearProgress, CircularProgress } from "@mui/material";
import QuizeChoice from "../../components/QuizeChoice/QuizeChoice";
import QuizeBlankSpace from "../../components/QuizeBlankSpace/QuizeBlankSpace";
import reactStringReplace from "react-string-replace";
import { choicesActions } from "../../store/choices";
import { selectedAnswersActions } from "../../store/selectedAnswers";
import { Cofee } from "../../components";

const TakeExam = ({ token }) => {
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
  const [courseId, setCourseId] = useState("");

  const [finalScore, setFinalScore] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [examFinished, setExamFinished] = useState(false);

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
        setCourseId(levelRes.data.courseId);
        const questionsList = [];
        for (let i = 0; i < levelRes.data.questions.length; i++) {
          questionsList.push({
            question: levelRes.data.questions[i].question,
            fullAnswer: levelRes.data.questions[i].fullAnswer,
            choices: levelRes.data.questions[i].Choices,
          });
        }
        setQuestions(questionsList);
        setCurrentQuestion(levelRes.data.questions[0]);
        dispatch(choicesActions.deleteAllChoices());
        dispatch(
          choicesActions.setMulChoices(levelRes.data.questions[0].Choices)
        );
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  const next = () => {
    if (questionIndex < questions.length - 1) {
      checkAnswer();
      setCurrentQuestion(questions[questionIndex + 1]);
      dispatch(choicesActions.deleteAllChoices());
      dispatch(
        choicesActions.setMulChoices(questions[questionIndex + 1].choices)
      );
      dispatch(selectedAnswersActions.deleteAllSelectedAnswers());
      console.log(currentQuestion);
      if (questionIndex + 1 === questions.length - 1) {
        setExamFinished(true);
      }
      setQuestionIndex(questionIndex + 1);
    }
  };

  const checkAnswer = () => {
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
      setFinalScore(finalScore - 1);
    } else {
      setFinalScore(finalScore + 1);
    }
  };

  const getAnswer = (index) => {
    for (let i = 0; i < selectedAnswersNum; i++) {
      if (selectedAnswers[i].index === index)
        return selectedAnswers[i].selectedAnswer;
    }
    return "";
  };

  const finishExam = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_ADDRESS}levels/setScore/${levelId}`,
        { score: finalScore / questions.length },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
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
                  <QuizeBlankSpace key={i} index={i} ans="" />
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
        {examFinished ? (
          <Link to={`/showCourse/${courseId}`}>
            <button onClick={finishExam}>Finish Exam</button>
          </Link>
        ) : (
          <button onClick={next}>Next</button>
        )}
      </div>
    </div>
  );
};

export default TakeExam;

import { React, useState } from "react";
import classes from "./CreateCourse.module.scss";
import SelectImage from "../../images/selectImage.png";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { choicesActions } from "../../store/choices";
import { questionsActions } from "../../store/questions";
import { levelsActions } from "../../store/levels";
import { useNavigate } from "react-router-dom";
import Choice from "../Choice/Choice";
import Level from "../Level/Level";
import Question from "../Question/Question";

const CreateCourse = ({ token }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const choices = useSelector((state) => state.choices.choices);
  const choicesNum = useSelector((state) => state.choices.choicesNum);

  const questions = useSelector((state) => state.questions.questions);
  const questionsNum = useSelector((state) => state.questions.questionsNum);

  const levels = useSelector((state) => state.levels.levels);
  const levelsNum = useSelector((state) => state.levels.levelsNum);

  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseGoal, setCourseGoal] = useState("");
  const [courseBio, setCourseBio] = useState("");
  const [courseImageDisplay, setCourseImageDisplay] = useState(SelectImage);
  const [courseImage, setCourseImage] = useState(null);
  const [levelImageDisplay, setLevelImageDisplay] = useState(SelectImage);
  const [levelImage, setLeveleImage] = useState(null);
  const [levelTitle, setLeveleTitle] = useState("");
  const [levelDescription, setLeveleDescription] = useState("");

  const [courseCreated, setCourseCreated] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [filesUploading, setFilesUploading] = useState(false);
  const [jobDone, setJobDone] = useState(false);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [choice, setChoice] = useState("");

  const handleUploadedFile = (e) => {
    console.log(e.target.files[0]);
    setCourseImage(e.target.files[0]);
    setCourseImageDisplay(URL.createObjectURL(e.target.files[0]));
  };

  const createNewCourse = async () => {
    setIsCreating(true);
    const formData = new FormData();
    formData.append("title", courseName);
    formData.append("goal", courseGoal);
    formData.append("abstract", courseBio);
    formData.append("avatar", courseImage);

    for (const value of formData.values()) {
      console.log(value);
    }

    await uploadNewUserData(formData);
  };

  const uploadNewUserData = async (formData) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ADDRESS}courses/create`,
        formData,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      setCourseId(res.data.id);
      setIsCreating(false);
      dispatch(choicesActions.deleteAllChoices());
      dispatch(questionsActions.deleteAllQuestions());
      setCourseCreated(true);
    } catch (err) {
      console.log(err);
    }
  };

  const createLevel = () => {
    console.log(questions);
    if (
      levelTitle !== "" &&
      levelImage !== null &&
      questionsNum !== 0 &&
      levelDescription !== ""
    ) {
      dispatch(
        levelsActions.addLevel({
          title: levelTitle,
          doc: levelImage,
          desc: levelDescription,
          questions: questions,
        })
      );
      dispatch(questionsActions.deleteAllQuestions());
      dispatch(choicesActions.deleteAllChoices());
      setChoice("");
      setQuestion("");
      setAnswer("");
      setLeveleImage(null);
      setLevelImageDisplay(SelectImage);
      setLeveleTitle("");
      setLeveleDescription("");
    }
  };

  const handleUploadedLevelDoc = (e) => {
    setFilesUploading(true);
    console.log(e.target.files[0]);
    setLeveleImage(e.target.files[0]);
    setLevelImageDisplay(URL.createObjectURL(e.target.files[0]));
    setFilesUploading(false);
  };

  const addChoice = () => {
    if (choice !== "") {
      dispatch(choicesActions.addChoice({ choice: choice }));
      setChoice("");
    }
  };

  const finishCreatingCourse = async () => {
    console.log(levels);
    try {
      setJobDone(true);
      for (let i = 0; i < levelsNum; i++) {
        const formData = new FormData();
        formData.append("title", levels[i].title);
        formData.append("description", levels[i].desc);
        formData.append("avatar", levels[i].doc);
        formData.append("questions", JSON.stringify(levels[i].questions));

        await axios.post(
          `${process.env.REACT_APP_API_ADDRESS}levels/addLevel/${courseId}`,
          formData,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
      }
      navigate("/profileStructure/myCourses");
      setJobDone(false);
    } catch (err) {
      console.log(err);
    }
  };

  const addQuestion = () => {
    if (question !== "" && answer !== "" && choicesNum !== 0) {
      dispatch(
        questionsActions.addQuestion({
          question: question,
          fullAnswer: answer,
          choices: choices,
        })
      );
      dispatch(choicesActions.deleteAllChoices());
      setChoice("");
      setQuestion("");
      setAnswer("");
    }
  };

  return (
    <div className={classes.container}>
      <h2>Create New Course</h2>
      <div
        className={`${classes.courseDetails} ${
          courseCreated && classes.courseCreated
        }`}
      >
        <div className={classes.selectCourseImage}>
          <input
            id="selectCourseImage"
            type="file"
            accept="image/*"
            onChange={handleUploadedFile}
          />
          <label for="selectCourseImage">
            <img src={courseImageDisplay} alt="Select_Image" />
          </label>
        </div>
        <div className={classes.enterCourseDetails}>
          <div className={classes.enterData}>
            <input
              type="text"
              onChange={(e) => {
                setCourseName(e.target.value);
              }}
              required
            />
            <span>Title</span>
          </div>
          <div className={classes.enterData}>
            <input
              type="text"
              onChange={(e) => {
                setCourseGoal(e.target.value);
              }}
              required
            />
            <span>Goals</span>
          </div>
          <div className={classes.enterData}>
            <textarea
              onChange={(e) => {
                setCourseBio(e.target.value);
              }}
              required
            />
            <span>Abstract</span>
          </div>
        </div>
        {isCreating ? (
          <CircularProgress />
        ) : (
          <button className={classes.createCourse} onClick={createNewCourse}>
            Create
          </button>
        )}
      </div>
      <div
        className={`${classes.addLevel} ${
          courseCreated && classes.nowAddLevel
        }`}
      >
        <div className={classes.levelDetails}>
          <h3>Now Create Some Levels for this Course</h3>
          <div className={classes.enterData}>
            <input
              value={levelTitle}
              type="text"
              onChange={(e) => {
                setLeveleTitle(e.target.value);
              }}
              required
            />
            <span>Level Title</span>
          </div>
          <div className={classes.enterData}>
            <textarea
              value={levelDescription}
              type="text"
              onChange={(e) => {
                setLeveleDescription(e.target.value);
              }}
              required
            />
            <span>Level Desciption</span>
          </div>
          <label
            for="uploadDoc"
            className={`${classes.addDoc}  ${
              filesUploading && classes.filesUploading
            }`}
          >
            Add New Document
            <input
              id="uploadDoc"
              type="file"
              multiple="multiple"
              accept=".jpg, .png, .jpeg, .jfif"
              onChange={handleUploadedLevelDoc}
              disabled={filesUploading}
            />
          </label>
          <div className={classes.uploadedDoc}>
            <img src={levelImageDisplay} alt="Level_Image" />
          </div>
        </div>
        <div className={classes.questionForm}>
          <h3>Add Qusetions for this Level</h3>
          <div className={classes.questionData}>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
            <span>Question</span>
          </div>
          <div className={classes.questionData}>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
            <span>Ful Answer</span>
          </div>
          <div className={classes.choiceData}>
            <input value={choice} onChange={(e) => setChoice(e.target.value)} />
            <button className={classes.addChoice} onClick={addChoice}>
              Add Choice
            </button>
            {choicesNum !== 0 && (
              <div className={classes.choices}>
                {choices.map((item, index) => (
                  <Choice
                    key={index}
                    answer={item.choice}
                    setChoice={setChoice}
                  />
                ))}
              </div>
            )}
          </div>
          <button className={classes.addQues} onClick={addQuestion}>
            Creating Question Finished :)
          </button>
        </div>
        {questionsNum !== 0 ? (
          <div className={classes.questions}>
            {questions.map((item, index) => (
              <Question
                key={index}
                question={item.question}
                fullAnswer={item.fullAnswer}
                choices={item.choices}
                setAnswer={setAnswer}
                setQuestion={setQuestion}
              />
            ))}
          </div>
        ) : (
          <p className={classes.empty}>No Questions</p>
        )}
        <button className={classes.finishCreatingLevel} onClick={createLevel}>
          Creating Level Finished :)
        </button>
        {levelsNum !== 0 ? (
          <div className={classes.levels}>
            {levels.map((item, index) => (
              <Level
                key={index}
                title={item.title}
                doc={item.doc}
                desc={item.desc}
                questions={item.questions}
                setTitle={setLeveleTitle}
                setDoc={setLeveleImage}
                setDocDisplay={setLevelImageDisplay}
                setDesc={setLeveleDescription}
              />
            ))}
          </div>
        ) : (
          <p className={classes.empty}>No Levels</p>
        )}
      </div>
      {!jobDone ? (
        <button
          className={classes.finishCreatingCourse}
          onClick={finishCreatingCourse}
        >
          Finish Creating Course :))
        </button>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default CreateCourse;

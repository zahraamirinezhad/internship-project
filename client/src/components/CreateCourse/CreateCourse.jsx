import { React, useState } from "react";
import classes from "./CreateCourse.module.scss";
import SelectImage from "../../images/selectImage.png";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { attachedFilesActions } from "../../store/attachedFiles";
import { choicesActions } from "../../store/choices";
import { questionsActions } from "../../store/questions";
import UploadedFile from "../UploadedFile/UploadedFile";
import { useNavigate } from "react-router-dom";
import Choice from "../Choice/Choice";
import Question from "../Question/Question";

const CreateCourse = ({ token }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const attachedFiles = useSelector(
    (state) => state.attachedFiles.attachedFiles
  );
  const attachedFilesNum = useSelector(
    (state) => state.attachedFiles.attachedFilesNum
  );

  const choices = useSelector((state) => state.choices.choices);
  const choicesNum = useSelector((state) => state.choices.choicesNum);

  const questions = useSelector((state) => state.questions.questions);
  const questionsNum = useSelector((state) => state.questions.questionsNum);

  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseGoal, setCourseGoal] = useState("");
  const [courseBio, setCourseBio] = useState("");
  const [courseImageDisplay, setCourseImageDisplay] = useState(SelectImage);
  const [courseImage, setCourseImage] = useState(null);

  const [courseCreated, setCourseCreated] = useState(false);
  const [docsAdded, setDocsAdded] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [filesUploading, setFilesUploading] = useState(false);

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
      dispatch(attachedFilesActions.deleteAllAttachedFiles());
      setCourseCreated(true);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadDoc = async (e) => {
    setFilesUploading(true);
    console.log(e.target.files);
    console.log(Array.from(e.target.files || []));
    const filesList = Array.from(e.target.files || []);

    for (let i = 0; i < filesList.length; i++) {
      dispatch(attachedFilesActions.addAttachedFiles(filesList[i]));
      const formData = new FormData();
      formData.append("avatar", filesList[i]);
      const res = await axios.post(
        `${process.env.REACT_APP_API_ADDRESS}uploadedFiles/addDoc/${courseId}`,
        formData,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
    }

    setFilesUploading(false);
    console.log(attachedFiles);

    console.log(attachedFiles);
  };

  const finishAddingFiles = async () => {
    setDocsAdded(true);
    dispatch(choicesActions.deleteAllChoices());
    dispatch(questionsActions.deleteAllQuestions());
  };

  const addChoice = () => {
    if (choice !== "") {
      dispatch(choicesActions.addChoice({ choice: choice }));
      setChoice("");
    }
  };

  const finishCreatingCourse = async () => {
    console.log(courseId);
    console.log(questions);
    console.log(questionsNum);
    for (let i = 0; i < questionsNum; i++) {
      await axios.post(
        `${process.env.REACT_APP_API_ADDRESS}questions/addQuestion/${courseId}`,
        {
          question: questions[i].question,
          fullAnswer: questions[i].fullAnswer,
          choices: questions[i].choices,
        },
        {
          headers: {
            token: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    }
    dispatch(choicesActions.deleteAllChoices());
    dispatch(questionsActions.deleteAllQuestions());
    navigate("/profileStructure/myCourses");
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
              readOnly={courseCreated}
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
              readOnly={courseCreated}
            />
            <span>Goals</span>
          </div>
          <div className={classes.enterData}>
            <textarea
              onChange={(e) => {
                setCourseBio(e.target.value);
              }}
              required
              readOnly={courseCreated}
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
        className={`${classes.courseDoc} ${
          courseCreated && classes.nowAddDoc
        } ${docsAdded && classes.finishAddingFiles}`}
      >
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
            accept=".pptx, .doc, .pdf, .jpg, .png, .jpeg"
            onChange={uploadDoc}
            disabled={filesUploading}
          />
        </label>
        <div
          className={`${classes.addedDocs} ${
            filesUploading && classes.filesUploading
          }`}
        >
          {attachedFilesNum !== 0 && (
            <div className={classes.uploadedFilesList}>
              {attachedFiles.map((item, index) => (
                <UploadedFile
                  key={index}
                  token={token}
                  id={item.id}
                  type={item.name.split(".")[item.name.split(".").length - 1]}
                  name={item.name}
                  downloadOrDelete="delete"
                />
              ))}
            </div>
          )}
        </div>
        {filesUploading ? (
          <CircularProgress />
        ) : (
          <div className={classes.finishAddingFiles}>
            <button onClick={finishAddingFiles}>Finish Adding Files :)</button>
          </div>
        )}
      </div>

      <div
        className={`${classes.addQuestion} ${
          docsAdded && classes.nowAddQuestion
        }`}
      >
        <div className={classes.questionForm}>
          <div className={classes.questionData}>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              readOnly={courseCreated}
            />
            <span>Question</span>
          </div>
          <div className={classes.questionData}>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
              readOnly={courseCreated}
            />
            <span>Ful Answer</span>
          </div>
          <div className={classes.choiceData}>
            <textarea
              value={choice}
              onChange={(e) => setChoice(e.target.value)}
            />
            <button className={classes.addChoice} onClick={addChoice}>
              Add Choice
            </button>
            {choicesNum !== 0 && (
              <div className={classes.choices}>
                {choices.map((item, index) => (
                  <Choice answer={item.choice} setChoice={setChoice} />
                ))}
              </div>
            )}
          </div>
          <button className={classes.addQues} onClick={addQuestion}>
            Creating Question Finished :)
          </button>
        </div>
        <div className={classes.questions}>
          {questions.map((item, index) => (
            <Question
              question={item.question}
              fullAnswer={item.fullAnswer}
              choices={item.choices}
              setAnswer={setAnswer}
              setQuestion={setQuestion}
            />
          ))}
        </div>
      </div>

      <button
        className={classes.finishCreatingCourse}
        onClick={finishCreatingCourse}
      >
        Finish Creating Course :))
      </button>
    </div>
  );
};

export default CreateCourse;

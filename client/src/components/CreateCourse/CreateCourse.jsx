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
      setCourseId(res.data._id);
      setIsCreating(false);
      dispatch(attachedFilesActions.deleteAllAttachedFiles());
      setCourseCreated(true);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadDoc = (e) => {
    console.log(e.target.files);
    console.log(Array.from(e.target.files || []));
    const filesList = Array.from(e.target.files || []);

    for (let i = 0; i < filesList.length; i++) {
      dispatch(attachedFilesActions.addAttachedFiles(filesList[i]));
    }

    console.log(attachedFiles);
  };

  const finishAddingFiles = async () => {
    for (let i = 0; i < attachedFilesNum; i++) {
      const formData = new FormData();
      formData.append("avatar", attachedFiles[i]);

      try {
        i === 0 && setFilesUploading(true);
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

        if (i === attachedFilesNum - 1) {
          setFilesUploading(false);
          dispatch(choicesActions.deleteAllChoices());
          dispatch(questionsActions.deleteAllQuestions());
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const addChoice = () => {
    if (choice !== "") {
      dispatch(choicesActions.addChoice({ name: choice }));
      setChoice("");
    }
  };

  const finishCreatingCourse = () => {
    navigate("/profileStructure/myCourses");
  };

  const addQuestion = () => {
    if (question !== "" && answer !== "" && choicesNum !== 0) {
      dispatch(
        questionsActions.addQuestion({
          name: question,
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
            disabled={courseCreated}
          />
          <label for="selectCourseImage">
            <img src={courseImageDisplay} alt="Select_Image" />
          </label>
        </div>
        <div className={classes.enterCourseDetails}>
          <div className={classes.enterData}>
            <label>Title</label>
            <input
              type="text"
              onChange={(e) => {
                setCourseName(e.target.value);
              }}
              readOnly={courseCreated}
            />
          </div>
          <div className={classes.enterData}>
            <label>Goals</label>
            <input
              type="text"
              onChange={(e) => {
                setCourseGoal(e.target.value);
              }}
              readOnly={courseCreated}
            />
          </div>
          <div className={classes.enterData}>
            <label>Abstract</label>
            <textarea
              onChange={(e) => {
                setCourseBio(e.target.value);
              }}
              readOnly={courseCreated}
            />
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
        className={`${classes.courseDoc} ${courseCreated && classes.nowAddDoc}`}
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
                  type={item.name.split(".")[1]}
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

      <div className={classes.addQuestion}>
        <div className={classes.questionForm}>
          <div className={classes.questionData}>
            <label>Question</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <div className={classes.questionData}>
            <label>Ful Answer</label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <div className={classes.choiceData}>
            <textarea
              value={choice}
              onChange={(e) => setChoice(e.target.value)}
            />
            <button className={classes.addChoice} onClick={addChoice}>
              Add Choice
            </button>
            <div className={classes.choices}>
              {choices.map((item, index) => (
                <Choice answer={item.name} setChoice={setChoice} />
              ))}
            </div>
          </div>
          <button className={classes.addQuestion} onClick={addQuestion}>
            Creating Question Finished :)
          </button>
        </div>
        <div className={classes.questions}>
          {questions.map((item, index) => (
            <Question
              question={item.name}
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

import { React, useState, useEffect } from "react";
import classes from "./EditCourse.module.scss";
import SelectImage from "../../images/selectImage.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { attachedFilesActions } from "../../store/attachedFiles";
import { choicesActions } from "../../store/choices";
import { questionsActions } from "../../store/questions";
import UploadedFile from "../UploadedFile/UploadedFile";
import { useNavigate, useParams } from "react-router-dom";
import Choice from "../Choice/Choice";
import Question from "../Question/Question";

const EditCourse = ({ token }) => {
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;

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

  const [courseName, setCourseName] = useState("");
  const [courseGoal, setCourseGoal] = useState("");
  const [courseBio, setCourseBio] = useState("");
  const [courseImageDisplay, setCourseImageDisplay] = useState(SelectImage);
  const [courseImage, setCourseImage] = useState(null);

  const [filesUploading, setFilesUploading] = useState(false);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [choice, setChoice] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const docsRes = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}courses/getCourseDocs/${courseId}`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log(docsRes);

        setCourseName(docsRes.data.title);
        setCourseGoal(docsRes.data.goal);
        setCourseBio(docsRes.data.abstract);
        setCourseImageDisplay(
          docsRes.data.avatar === null
            ? SelectImage
            : `http://localhost:8800/${docsRes.data.avatar}`
        );
        setCourseImage(
          docsRes.data.avatar === null
            ? SelectImage
            : `http://localhost:8800/${docsRes.data.avatar}`
        );

        dispatch(attachedFilesActions.deleteAllAttachedFiles());
        for (let i = 0; i < docsRes.data.UploadedFiles.length; i++) {
          dispatch(
            attachedFilesActions.addAttachedFiles({
              id: docsRes.data.UploadedFiles[i].id,
              name: docsRes.data.UploadedFiles[i].fileName,
              type: docsRes.data.UploadedFiles[i].type,
              path: docsRes.data.UploadedFiles[i].path,
            })
          );
        }
        console.log(attachedFiles);

        dispatch(questionsActions.deleteAllQuestions());
        dispatch(choicesActions.deleteAllChoices());
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
          dispatch(
            questionsActions.addQuestion({
              question: choiceRes.data.question,
              fullAnswer: choiceRes.data.fullAnswer,
              choices: choiceRes.data.Choices,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  const handleUploadedFile = (e) => {
    console.log(e.target.files[0]);
    setCourseImage(e.target.files[0]);
    setCourseImageDisplay(URL.createObjectURL(e.target.files[0]));
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
  };

  const addChoice = () => {
    if (choice !== "") {
      dispatch(choicesActions.addChoice({ choice: choice }));
      setChoice("");
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

  const finifhEditingCourse = async () => {
    const formData = new FormData();
    formData.append("title", courseName);
    formData.append("goal", courseGoal);
    formData.append("abstract", courseBio);
    formData.append("avatar", courseImage);

    for (const value of formData.values()) {
      console.log(value);
    }

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_ADDRESS}courses/editCourse/${courseId}`,
        formData,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }

    try {
      await axios.delete(
        `${process.env.REACT_APP_API_ADDRESS}questions/deleteCourseQuestions/${courseId}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );

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
    } catch (err) {
      console.log(err);
    }

    dispatch(attachedFilesActions.deleteAllAttachedFiles());
    dispatch(choicesActions.deleteAllChoices());
    dispatch(questionsActions.deleteAllQuestions());
    navigate("/teacher/profileStructure/myCourses");
  };

  return (
    <div className={classes.container}>
      <div className={classes.courseDetails}>
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
            <label>Title</label>
            <input
              value={courseName}
              type="text"
              onChange={(e) => {
                setCourseName(e.target.value);
              }}
            />
          </div>
          <div className={classes.enterData}>
            <label>Goals</label>
            <input
              value={courseGoal}
              type="text"
              onChange={(e) => {
                setCourseGoal(e.target.value);
              }}
            />
          </div>
          <div className={classes.enterData}>
            <label>Abstract</label>
            <textarea
              value={courseBio}
              onChange={(e) => {
                setCourseBio(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      <div className={classes.courseDoc}>
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
                <Choice answer={item.choice} setChoice={setChoice} />
              ))}
            </div>
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
        onClick={finifhEditingCourse}
      >
        Finish Editing Course :))
      </button>
    </div>
  );
};

export default EditCourse;

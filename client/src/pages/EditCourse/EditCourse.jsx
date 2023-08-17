import { React, useState, useEffect } from "react";
import classes from "./EditCourse.module.scss";
import SelectImage from "../../images/selectImage.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { levelsActions } from "../../store/levels";
import { choicesActions } from "../../store/choices";
import { questionsActions } from "../../store/questions";
import Level from "../../components/Level/Level";
import { useNavigate, useParams } from "react-router-dom";
import Choice from "../../components/Choice/Choice";
import Question from "../../components/Question/Question";
import { CircularProgress } from "@mui/material";

const EditCourse = ({ token }) => {
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;

  const dispatch = useDispatch();

  const choices = useSelector((state) => state.choices.choices);
  const choicesNum = useSelector((state) => state.choices.choicesNum);

  const questions = useSelector((state) => state.questions.questions);
  const questionsNum = useSelector((state) => state.questions.questionsNum);

  const levels = useSelector((state) => state.levels.levels);
  const levelsNum = useSelector((state) => state.levels.levelsNum);

  const [courseName, setCourseName] = useState("");
  const [courseGoal, setCourseGoal] = useState("");
  const [courseBio, setCourseBio] = useState("");
  const [courseImageDisplay, setCourseImageDisplay] = useState(SelectImage);
  const [courseImage, setCourseImage] = useState(null);
  const [levelImageDisplay, setLevelImageDisplay] = useState(SelectImage);
  const [levelImage, setLeveleImage] = useState(null);
  const [levelTitle, setLeveleTitle] = useState("");
  const [levelDescription, setLeveleDescription] = useState("");

  const [filesUploading, setFilesUploading] = useState(false);
  const [jobDone, setJobDone] = useState(false);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [choice, setChoice] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const docsRes = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}courses/getCourse/${courseId}`,
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
        setCourseImage(docsRes.data.avatar);

        dispatch(levelsActions.deleteAllLevels());
        const levelRes = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}courses/getCourseLevels/${courseId}`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log(levelRes);
        for (let i = 0; i < levelRes.data.length; i++) {
          dispatch(
            levelsActions.addLevel({
              title: levelRes.data[i].level.title,
              doc: levelRes.data[i].level.doc,
              desc: levelRes.data[i].level.description,
              questions: levelRes.data[i].questions,
            })
          );
        }
        dispatch(questionsActions.deleteAllQuestions());
        dispatch(choicesActions.deleteAllChoices());
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

  const editLevel = () => {
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

  const finifhEditingCourse = async () => {
    try {
      setJobDone(true);
      const formData = new FormData();
      formData.append("title", courseName);
      formData.append("goal", courseGoal);
      formData.append("abstract", courseBio);
      formData.append("avatar", courseImage);

      for (const value of formData.values()) {
        console.log(value);
      }

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

      // await axios.delete(
      //   `${process.env.REACT_APP_API_ADDRESS}courses/editCourse/deleteLevels/${courseId}`,
      //   {
      //     headers: {
      //       token: `Bearer ${token}`,
      //     },
      //   }
      // );

      for (let i = 0; i < levelsNum; i++) {
        const levelFormData = new FormData();
        levelFormData.append("title", levels[i].title);
        levelFormData.append("description", levels[i].desc);
        levelFormData.append("avatar", levels[i].doc);
        levelFormData.append("questions", JSON.stringify(levels[i].questions));

        await axios.post(
          `${process.env.REACT_APP_API_ADDRESS}levels/addLevel/${courseId}`,
          levelFormData,
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

    dispatch(choicesActions.deleteAllChoices());
    dispatch(questionsActions.deleteAllQuestions());
    navigate("/profileStructure/myCourses");
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
            <input
              value={courseName}
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
              value={courseGoal}
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
              value={courseBio}
              onChange={(e) => {
                setCourseBio(e.target.value);
              }}
              required
            />
            <span>Abstract</span>
          </div>
        </div>
      </div>

      <div className={classes.addLevel}>
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
        <button className={classes.finishCreatingLevel} onClick={editLevel}>
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
          onClick={finifhEditingCourse}
        >
          Finish Editing Course :))
        </button>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default EditCourse;

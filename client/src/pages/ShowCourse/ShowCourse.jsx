import { React, useState, useEffect } from "react";
import classes from "./ShowCourse.module.scss";
import UploadedFile from "../../components/UploadedFile/UploadedFile";
import { useParams, Link } from "react-router-dom";
import SelectImage from "../../images/selectImage.png";
import { useDispatch, useSelector } from "react-redux";
import { attachedFilesActions } from "../../store/attachedFiles";
import axios from "axios";

const ShowCourse = ({ token }) => {
  const params = useParams();
  const courseId = params.courseId;

  const dispatch = useDispatch();
  const attachedFiles = useSelector(
    (state) => state.attachedFiles.attachedFiles
  );
  const attachedFilesNum = useSelector(
    (state) => state.attachedFiles.attachedFilesNum
  );

  const [courseName, setCourseName] = useState("");
  const [courseGoal, setCourseGoal] = useState("");
  const [courseBio, setCourseBio] = useState("");
  const [courseImage, setCourseImage] = useState(null);
  const [courseTaken, setCourseTaken] = useState(false);

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

        const isTakenRes = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}scores/isTaken/${courseId}`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log(isTakenRes);
        setCourseTaken(isTakenRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  const takeCourse = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ADDRESS}scores/takeCourse/${courseId}`,
        {
          score: 0,
          lastQuestion: 0,
          courseFinished: false,
          CourseId: courseId,
        },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      setCourseTaken(!courseTaken);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const logOut = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_ADDRESS}scores/logOut/${courseId}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      setCourseTaken(false);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.courseDetails}>
        <div className={classes.courseImage}>
          <img src={courseImage} alt="Select_Image" />
        </div>
        <div className={classes.enterCourseDetails}>
          <div className={classes.enterData}>
            <label>Title</label>
            <input value={courseName} type="text" readOnly />
          </div>
          <div className={classes.enterData}>
            <label>Goals</label>
            <input value={courseGoal} type="text" readOnly />
          </div>
          <div className={classes.enterData}>
            <label>Abstract</label>
            <textarea value={courseBio} readOnly />
          </div>
        </div>
      </div>

      <div className={classes.courseDocs}>
        <div className={classes.addedDocs}>
          {attachedFilesNum !== 0 && (
            <div className={classes.uploadedFilesList}>
              {attachedFiles.map((item, index) => (
                <UploadedFile
                  key={index}
                  token={token}
                  id={item.id}
                  type={item.name.split(".")[item.name.split(".").length - 1]}
                  name={item.name}
                  path={item.path}
                  downloadOrDelete="download"
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={classes.courseOptions}>
        {courseTaken ? (
          <button className={classes.logOut} onClick={logOut}>
            Log Out :(((
          </button>
        ) : (
          <button className={classes.takeCourse} onClick={takeCourse}>
            Take the Course :)))
          </button>
        )}
        {courseTaken && (
          <Link
            className={classes.continueCourse}
            to={`/takeCourse/${courseId}`}
          >
            Continue :)))
          </Link>
        )}
      </div>
    </div>
  );
};

export default ShowCourse;

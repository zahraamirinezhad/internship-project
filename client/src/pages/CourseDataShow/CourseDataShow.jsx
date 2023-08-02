import { React, useState, useEffect } from "react";
import classes from "./CourseDataShow.module.scss";
import UploadedFile from "../../components/UploadedFile/UploadedFile";
import { useParams } from "react-router-dom";
import SelectImage from "../../images/selectImage.png";
import { useDispatch, useSelector } from "react-redux";
import { attachedFilesActions } from "../../store/attachedFiles";
import { usersActions } from "../../store/user";
import axios from "axios";
import User from "../../components/User/User";

const CourseDataShow = ({ token }) => {
  const params = useParams();
  const courseId = params.courseId;

  const dispatch = useDispatch();
  const attachedFiles = useSelector(
    (state) => state.attachedFiles.attachedFiles
  );
  const attachedFilesNum = useSelector(
    (state) => state.attachedFiles.attachedFilesNum
  );

  const students = useSelector((state) => state.users.users);
  const studentsNum = useSelector((state) => state.courses.usersNum);

  const [courseName, setCourseName] = useState("");
  const [courseGoal, setCourseGoal] = useState("");
  const [courseBio, setCourseBio] = useState("");
  const [courseImage, setCourseImage] = useState(null);

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

        const studentsRes = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}courses/getStudents/${courseId}`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log(studentsRes.data);
        dispatch(usersActions.setData(studentsRes.data));
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

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
      <div className={classes.courseStudents}>
        {studentsNum !== 0 && (
          <div className={classes.courseStudentsList}>
            {students.map((item, index) => (
              <User
                key={index}
                token={token}
                id={item.id}
                userName={item.username}
                avatar={item.profilePic}
                bio={item.bio}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDataShow;

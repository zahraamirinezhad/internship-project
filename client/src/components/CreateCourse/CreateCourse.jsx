import { React, useState } from "react";
import classes from "./CreateCourse.module.scss";
import SelectImage from "../../images/selectImage.png";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { attachedFilesActions } from "../../store/attachedFiles";
import UploadedFile from "../UploadedFile/UploadedFile";

const CreateCourse = ({ token }) => {
  const dispatch = useDispatch();
  const attachedFiles = useSelector(
    (state) => state.attachedFiles.attachedFiles
  );
  const attachedFilesNum = useSelector(
    (state) => state.attachedFiles.attachedFilesNum
  );

  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseGoal, setCourseGoal] = useState("");
  const [courseBio, setCourseBio] = useState("");
  const [courseImageDisplay, setCourseImageDisplay] = useState(SelectImage);
  const [courseImage, setCourseImage] = useState(null);

  const [courseCreated, setCourseCreated] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

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
      setCourseId(res._id);
      setIsCreating(false);
      dispatch(attachedFilesActions.deleteAllAttachedFiles());
      setCourseCreated(true);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadDoc = async (e) => {
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ADDRESS}courses/addDoc/64b20a6aaa381b36346f019b`,
        formData,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      dispatch(attachedFilesActions.setAttachedFiles(res.data.docs));
    } catch (err) {
      console.log(err);
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

      <div className={classes.courseDoc}>
        <label for="uploadDoc" className={classes.addDoc}>
          Add New Document
          <input
            id="uploadDoc"
            type="file"
            accept=".pptx, .doc, .pdf, .jpg, .png, .jpeg"
            onChange={uploadDoc}
          />
        </label>
        <div className={classes.addedDocs}>
          {attachedFilesNum !== 0 && (
            <div className={classes.uploadedFilesList}>
              {attachedFiles.map((item, index) => (
                <UploadedFile
                  key={index}
                  token={token}
                  id={item.fileId}
                  type={item.fileName.split(".")[1]}
                  fileName={item.fileName}
                  path={item.path}
                  courseId="64b20a6aaa381b36346f019b"
                  downloadOrDelete="delete"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;

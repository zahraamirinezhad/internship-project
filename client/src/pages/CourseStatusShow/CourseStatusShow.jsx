import { React, useState, useEffect } from "react";
import classes from "./CourseStatusShow.module.scss";
import { useParams } from "react-router-dom";
import SelectImage from "../../images/selectImage.png";
import { useDispatch, useSelector } from "react-redux";
import { levelsActions } from "../../store/levels";
import axios from "axios";
import User from "../../components/User/User";
import LevelShow from "../../components/LevelShow/LevelShow";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress } from "@mui/material";
import LevelStatus from "../../components/LevelStatus/LevelStatus";

const columns = [
  {
    field: "username",
    headerName: "User Name",
    width: 150,
  },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "studentNumber",
    headerName: "Student Number",
    type: "number",
    width: 150,
  },
];

const CourseStatusShow = ({ token }) => {
  const params = useParams();
  const courseId = params.courseId;

  const dispatch = useDispatch();
  const levels = useSelector((state) => state.levels.levels);
  const levelsNum = useSelector((state) => state.levels.levelsNum);

  const [students, setStudents] = useState([]);

  const [courseName, setCourseName] = useState("");
  const [courseGoal, setCourseGoal] = useState("");
  const [courseBio, setCourseBio] = useState("");
  const [courseImage, setCourseImage] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

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
        setCourseImage(
          docsRes.data.avatar === null
            ? SelectImage
            : `http://localhost:8800/${docsRes.data.avatar}`
        );

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
              id: levelRes.data[i].level.id,
              title: levelRes.data[i].level.title,
              doc: levelRes.data[i].level.doc,
              desc: levelRes.data[i].level.description,
              isExam: docsRes.data.isExam,
            })
          );
        }

        const studentsRes = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}courses/getStudents/${courseId}`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log(studentsRes.data);
        setStudents(studentsRes.data);

        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.courseDetails}>
        <span className={classes.border}></span>
        <span className={classes.border}></span>
        <span className={classes.border}></span>
        <span className={classes.border}></span>
        <div className={classes.courseImage}>
          <img src={courseImage} alt="Select_Image" />
        </div>
        <div className={classes.enterCourseDetails}>
          <div className={classes.enterData}>
            <input value={courseName} type="text" readOnly />
            <span>Title</span>
          </div>
          <div className={classes.enterData}>
            <input value={courseGoal} type="text" readOnly />
            <span>Goals</span>
          </div>
          <div className={classes.enterData}>
            <textarea value={courseBio} readOnly />
            <span>Abstract</span>
          </div>
        </div>
      </div>

      <h1 className={classes.title}>Levels</h1>
      {levelsNum !== 0 ? (
        <div className={classes.courseLevels}>
          {levels.map((item, index) => (
            <LevelShow
              key={index}
              id={item.id}
              title={item.title}
              doc={item.doc}
              desc={item.desc}
              isExam={item.isExam}
            />
          ))}
        </div>
      ) : (
        <p className={classes.empty}>No Levels</p>
      )}

      <h1 className={classes.title}>Students</h1>
      <div className={classes.courseStudents}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box sx={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={students}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[4]}
              disableRowSelectionOnClick
            />
          </Box>
        )}
      </div>

      <h1 className={classes.title}>Levels Scores</h1>
      <div className={classes.levelsStatus}>
        {levelsNum !== 0 ? (
          <div className={classes.levels}>
            {levels.map((item, index) => (
              <LevelStatus
                key={index}
                id={item.id}
                token={token}
                title={item.title}
                doc={item.doc}
                desc={item.desc}
              />
            ))}
          </div>
        ) : (
          <p className={classes.empty}>No Levels</p>
        )}
      </div>
    </div>
  );
};

export default CourseStatusShow;

import { React, useState, useEffect } from "react";
import classes from "./WebCourseStatusShow.module.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { usersActions } from "../../store/users";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress } from "@mui/material";
import User from "../../components/User/User";

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
  {
    field: "score",
    headerName: "Score",
    type: "number",
    width: 150,
  },
];

const WebCourseStatusShow = ({ token }) => {
  const params = useParams();
  const courseId = params.webCourseId;

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const usersNum = useSelector((state) => state.users.usersNum);

  const [students, setStudents] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [courseBio, setCourseBio] = useState("");
  const [courseQuestion, setCourseQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const docsRes = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}webCourses/getCourse/${courseId}`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log(docsRes);

        setCourseName(docsRes.data.title);
        setCourseBio(docsRes.data.abstract);
        setCourseQuestion(`
        <html>
          <body>${docsRes.data.html}</body>
          <style>${docsRes.data.css}</style>
          <script>${docsRes.data.javascript}</script>
        </html>
      `);

        const studentsRes = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}webCourses/getStudents/${courseId}`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log(studentsRes.data);
        for (let i = 0; i < studentsRes.data.length; i++) {
          dispatch(
            usersActions.addUser({
              id: studentsRes.data[i].Student.id,
              username: studentsRes.data[i].Student.username,
              firstName: studentsRes.data[i].Student.firstName,
              lastName: studentsRes.data[i].Student.lastName,
              studentNumber: studentsRes.data[i].Student.studentNumber,
              avatar: studentsRes.data[i].Student.profilePic,
              bio: studentsRes.data[i].Student.bio,
              score: studentsRes.data[i].score,
            })
          );
        }
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
        <div className={classes.enterCourseDetails}>
          <div className={classes.enterData}>
            <input value={courseName} type="text" readOnly />
            <span>Title</span>
          </div>
          <div className={classes.enterData}>
            <textarea value={courseBio} readOnly />
            <span>Abstract</span>
          </div>
        </div>
      </div>

      <div className={classes.courseImage}>
        <iframe
          srcDoc={courseQuestion}
          title="output"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
        />
      </div>

      <h1 className={classes.title}>Students</h1>
      <div className={classes.levelsStatus}>
        {usersNum !== 0 ? (
          <div className={classes.levels}>
            {users.map((item, index) => (
              <User
                key={index}
                id={item.id}
                token={token}
                firstName={item.firstName}
                lastName={item.lastName}
                studentNumber={item.studentNumber}
                userName={item.username}
                avatar={item.avatar}
                bio={item.bio}
                courseId={courseId}
              />
            ))}
          </div>
        ) : (
          <p className={classes.empty}>No Students</p>
        )}
      </div>

      <h1 className={classes.title}>scores</h1>
      <div className={classes.courseStudents}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box sx={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={users}
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
    </div>
  );
};

export default WebCourseStatusShow;

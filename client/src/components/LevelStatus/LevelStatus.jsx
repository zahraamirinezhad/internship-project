import React, { useState, useEffect } from "react";
import classes from "./LevelStatus.module.scss";
import LevelShow from "../../components/LevelShow/LevelShow";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress } from "@mui/material";
import axios from "axios";

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

const LevelStatus = ({ id, token, title, doc, desc }) => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const studentsRes = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}levels/getStudents/${id}`,
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
      <div className={classes.level}>
        <LevelShow id={id} title={title} doc={doc} desc={desc} />
      </div>

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
    </div>
  );
};

export default LevelStatus;

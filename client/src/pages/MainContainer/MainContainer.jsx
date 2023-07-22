import { React } from "react";
import classes from "./MainContainer.module.scss";
import { EditCourse, Header } from "../../components";
import { useLocation } from "react-router-dom";
import {
  MainPage,
  ProfileStructure,
  Practice,
  Compiler,
  PracticeWebLan,
} from "..";

const MainContainer = ({ token, isTeacher }) => {
  const location = useLocation();
  // console.log(location);
  const url = location.pathname.split("/")[2];
  console.log(url);

  return (
    <div className={classes.container}>
      <div className={classes.container}>
        <Header token={token} isTeacher={isTeacher} />
        <div className={classes.body}>
          {
            {
              mainPage: <MainPage token={token} isTeacher={isTeacher} />,
              profileStructure: (
                <ProfileStructure token={token} isTeacher={isTeacher} />
              ),
              practice: <Practice token={token} isTeacher={isTeacher} />,
              otherLan: <Compiler token={token} isTeacher={isTeacher} />,
              webLan: <PracticeWebLan isTeacher={isTeacher} />,
              editCourse: <EditCourse isTeacher={isTeacher} />,
            }[url]
          }
        </div>
      </div>
    </div>
  );
};

export default MainContainer;

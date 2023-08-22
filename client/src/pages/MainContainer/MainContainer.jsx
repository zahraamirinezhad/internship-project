import { React } from "react";
import classes from "./MainContainer.module.scss";
import { Header } from "../../components";
import { useLocation } from "react-router-dom";
import {
  MainPage,
  ProfileStructure,
  Practice,
  Compiler,
  PracticeWebLan,
  ShowCourse,
  EditCourse,
  TakeExam,
  TakePractice,
  ShowWebCourse,
  CourseDataShow,
  TakeWebExam,
  TakeWebPractice,
  EditWebCourse,
} from "..";
import AuthContext from "../../authContext/AuthContext";
import { useContext } from "react";

const MainContainer = () => {
  const location = useLocation();
  // console.log(location);
  const url = location.pathname.split("/")[1];
  console.log(url);

  const data = useContext(AuthContext).getAccessToken();
  console.log(data);
  let token = null;
  let isTeacher = null;
  if (data) {
    token = data.tokens;
    isTeacher = data.isTeacher;
  }

  return (
    <div className={classes.container}>
      <div className={classes.container}>
        <Header token={token} isTeacher={isTeacher} />
        <div className={classes.body}>
          {
            {
              "": <MainPage token={token} isTeacher={isTeacher} />,
              mainPage: <MainPage token={token} isTeacher={isTeacher} />,
              profileStructure: (
                <ProfileStructure token={token} isTeacher={isTeacher} />
              ),
              practice: <Practice token={token} isTeacher={isTeacher} />,
              otherLan: <Compiler token={token} isTeacher={isTeacher} />,
              webLan: <PracticeWebLan isTeacher={isTeacher} />,
              editCourse: <EditCourse token={token} isTeacher={true} />,
              editWebCourse: <EditWebCourse token={token} isTeacher={true} />,
              showCourse: <ShowCourse token={token} isTeacher={isTeacher} />,
              showWebCourse: (
                <ShowWebCourse token={token} isTeacher={isTeacher} />
              ),
              takeExam: <TakeExam token={token} />,
              takeWebExam: <TakeWebExam token={token} />,
              takePractice: <TakePractice token={token} />,
              takeWebPractice: <TakeWebPractice token={token} />,
              courseDataShow: <CourseDataShow token={token} isTeacher={true} />,
            }[url]
          }
        </div>
      </div>
    </div>
  );
};

export default MainContainer;

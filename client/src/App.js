import classes from "./App.module.scss";
import { CreateAccount, Login, MainContainer } from "./pages";
import { Routes, Route } from "react-router-dom";
import AuthContext from "./authContext/AuthContext";
import { useContext } from "react";

function App() {
  const data = useContext(AuthContext).getAccessToken();
  console.log(data);
  let token = null;
  if (data) {
    token = data.tokens;
  }

  return (
    <div className={classes.container}>
      <Routes>
        <Route path="/" element={token ? <MainContainer /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        {token && (
          <>
            <Route path="/mainPage" element={<MainContainer />} />
            <Route
              path="/profileStructure/profile"
              element={<MainContainer />}
            />
            <Route
              path="/profileStructure/editProfile"
              element={<MainContainer />}
            />
            <Route
              path="/profileStructure/createCourse"
              element={<MainContainer />}
            />
            <Route
              path="/profileStructure/myCourses"
              element={<MainContainer />}
            />
            <Route path="/practice" element={<MainContainer />} />
            <Route path="/otherLan" element={<MainContainer />} />
            <Route path="/webLan" element={<MainContainer />} />
            <Route path="/editCourse/:courseId" element={<MainContainer />} />
            <Route path="/showCourse/:courseId" element={<MainContainer />} />
            <Route path="/takeCourse/:levelId" element={<MainContainer />} />
            <Route
              path="/courseDataShow/:courseId"
              element={<MainContainer />}
            />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;

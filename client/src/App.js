import classes from "./App.module.scss";
import { CreateAccount, Login, MainContainer } from "./pages";
import { Routes, Route } from "react-router-dom";
import AuthContext from "./authContext/AuthContext";
import { useContext } from "react";

function App() {
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
      <Routes>
        <Route
          path="/:status/mainPage"
          element={
            token ? (
              <MainContainer token={token} isTeacher={isTeacher} />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        {token && (
          <>
            <Route
              path="/:status/mainPage"
              element={<MainContainer token={token} isTeacher={isTeacher} />}
            />
            <Route
              path="/:status/profileStructure/profile"
              element={<MainContainer token={token} isTeacher={isTeacher} />}
            />
            <Route
              path="/:status/profileStructure/editProfile"
              element={<MainContainer token={token} isTeacher={isTeacher} />}
            />
            <Route
              path="/:status/profileStructure/createCourse"
              element={<MainContainer token={token} />}
            />
            <Route
              path="/:status/profileStructure/myCourses"
              element={<MainContainer token={token} isTeacher={isTeacher} />}
            />
            <Route
              path="/:status/practice"
              element={<MainContainer token={token} isTeacher={isTeacher} />}
            />
            <Route
              path="/:status/otherLan"
              element={<MainContainer token={token} isTeacher={isTeacher} />}
            />
            <Route
              path="/:status/webLan"
              element={<MainContainer token={token} isTeacher={isTeacher} />}
            />

            <Route
              path="/:status/editCourse/:id"
              element={<MainContainer token={token} />}
            />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;

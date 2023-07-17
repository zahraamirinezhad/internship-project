import classes from "./App.module.scss";
import { CreateAccount, Login, MainContainer } from "./pages";
import { Routes, Route } from "react-router-dom";
import AuthContext from "./authContext/AuthContext";
import { useContext } from "react";

function App() {
  const token = useContext(AuthContext).getAccessToken();
  console.log(token);

  return (
    <div className={classes.container}>
      <Routes>
        <Route
          path="/"
          element={token ? <MainContainer token={token} /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        {token && (
          <>
            <Route path="/mainPage" element={<MainContainer token={token} />} />
            <Route
              path="/profileStructure/profile"
              element={<MainContainer token={token} />}
            />
            <Route
              path="/profileStructure/editProfile"
              element={<MainContainer token={token} />}
            />
            <Route
              path="/profileStructure/createCourse"
              element={<MainContainer token={token} />}
            />
            <Route
              path="/profileStructure/myCourses"
              element={<MainContainer token={token} />}
            />
            <Route path="/practice" element={<MainContainer token={token} />} />
            <Route path="/otherLan" element={<MainContainer token={token} />} />
            <Route path="/webLan" element={<MainContainer token={token} />} />

            <Route
              path="/editCourse/:id"
              element={<MainContainer token={token} />}
            />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;

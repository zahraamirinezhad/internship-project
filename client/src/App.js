import classes from "./App.module.scss";
import { CreateAccount, Login, MainContainer } from "./pages";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./authContext/AuthContext";
import { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className={classes.container}>
      <Routes>
        <Route path="/" element={user ? <MainContainer /> : <Login />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/createAccount"
          element={!user ? <CreateAccount /> : <Navigate to="/" replace />}
        />
        {user && (
          <>
            <Route path="/mainPage" element={<MainContainer />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;

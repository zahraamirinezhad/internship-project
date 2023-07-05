import classes from "./App.module.scss";
import { CreateAccount, Login } from "./pages";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className={classes.container}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createAccount" element={<CreateAccount />} />
      </Routes>
    </div>
  );
}

export default App;

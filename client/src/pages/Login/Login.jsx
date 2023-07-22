import { React, useState, useContext } from "react";
import classes from "./Login.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

const Login = () => {
  const navigate = useNavigate();

  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [userStudentNumber, setUserStudentNumber] = useState(0);
  const [isTeacher, setIsTeacher] = useState(false);

  const [error, setError] = useState(false);

  const manageLogin = async (e) => {
    e.preventDefault();
    try {
      const apiResponse = await axios.post(
        `${process.env.REACT_APP_API_ADDRESS}auth/login/`,
        {
          email: emailData,
          password: passwordData,
          isTeacher: isTeacher,
          userStudentNumber: userStudentNumber,
        }
      );
      console.log(apiResponse);
      localStorage.setItem(
        "tokens",
        JSON.stringify(apiResponse.data.accessToken)
      );
      localStorage.setItem("isTeacher", isTeacher);
      isTeacher ? navigate("/teacher/mainPage") : navigate("/student/mainPage");
      // navigate("/mainPage", { state: { isTeacher } });
      // err.data === "Wrong_Password_Username" ? setError(true) : setError(false);
    } catch (err) {
      console.log(err);
    }
  };

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function manageEmailValidation(value) {
    if (validateEmail(value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
    setEmailData(value);
  }

  return (
    <div className={classes.container}>
      <div className={classes.dark_cover}></div>
      <div className={classes.titleContainer}>
        <h1 className={classes.title}>Login</h1>
      </div>
      <div className={classes.login}>
        <div className={classes.steps}>
          <div className={classes.enterData}>
            <label>Email</label>
            <input
              type="text"
              className={`${!emailValid && classes.invalidEmail}`}
              onChange={(value) => {
                manageEmailValidation(value.target.value);
              }}
            />
          </div>
          <div className={classes.enterData}>
            <label>Password</label>
            <input
              type="password"
              onChange={(value) => {
                setPasswordData(value.target.value);
              }}
            />
          </div>
          <div className={classes.setUserStatus}>
            <div className={classes.userStatus}>
              <label>Are You a teacher ?</label>
              <div className={classes.checkBox}>
                <input
                  id="IsTeacher"
                  type="checkbox"
                  onChange={(e) => {
                    setIsTeacher(e.target.checked);
                  }}
                />
                <label for="IsTeacher" className={classes.custom}></label>
              </div>
            </div>
            <div
              className={`${classes.enterData} ${isTeacher && classes.teacher}`}
            >
              <label>Student Number</label>
              <input
                className={classes.shortData}
                type="number"
                value={userStudentNumber}
                onChange={(e) => {
                  setUserStudentNumber(e.target.value);
                }}
                readOnly={isTeacher}
                min={0}
              />
            </div>
          </div>
          <button className={classes.option} onClick={(e) => manageLogin(e)}>
            <LoginIcon />
            Login
          </button>
          {error && <p className={classes.error}>Wrong_Password_Username</p>}
          <div className={classes.userOption}>
            Don't have an account?
            <Link
              to="/createAccount"
              className={`${classes.btn} ${classes.goToCreateAccount}`}
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

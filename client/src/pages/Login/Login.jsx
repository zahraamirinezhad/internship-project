import { React, useState } from "react";
import classes from "./Login.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Snackbar, Alert } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();

  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [userStudentNumber, setUserStudentNumber] = useState(0);
  const [isTeacher, setIsTeacher] = useState(false);

  const [error, setError] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [dataComplete, setDataComplete] = useState(false);

  const manageLogin = async (e) => {
    e.preventDefault();
    if (passwordData !== "" && validateEmail(emailData)) {
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
        console.log(isTeacher);
        localStorage.setItem(
          "tokens",
          JSON.stringify(apiResponse.data.accessToken)
        );
        localStorage.setItem("isTeacher", isTeacher);
        navigate("/");
        // navigate("/mainPage", { state: { isTeacher } });
        // err.data === "Wrong_Password_Username" ? setError(true) : setError(false);
      } catch (err) {
        console.log(err);
      }
    } else {
      setDataComplete(true);
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
      <div className={classes.login}>
        <div className={classes.borderLine}></div>
        <dic className={classes.form}>
          <div className={classes.enterData}>
            <input
              type="text"
              className={`${!emailValid && classes.invalidEmail}`}
              onChange={(value) => {
                manageEmailValidation(value.target.value);
              }}
              required
            />
            <span>Email</span>
            <i></i>
          </div>
          <div className={classes.enterData}>
            <input
              type={passwordVisible ? "text" : "password"}
              onChange={(value) => {
                setPasswordData(value.target.value);
              }}
              required
            />
            <span>Password</span>
            <i></i>
            <button
              onClick={() => {
                setPasswordVisible(!passwordVisible);
              }}
            >
              {passwordVisible ? <Visibility /> : <VisibilityOff />}
            </button>
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
              className={`${classes.enterStudentNumber} ${
                isTeacher && classes.teacher
              }`}
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
        </dic>
      </div>
      <Snackbar
        open={dataComplete}
        autoHideDuration={2000}
        onClose={() => {
          setDataComplete(false);
        }}
      >
        <Alert
          variant="filled"
          severity="error"
          onClose={() => {
            setDataComplete(false);
          }}
          sx={{ width: "100%" }}
        >
          Please Fill the Form Completely
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;

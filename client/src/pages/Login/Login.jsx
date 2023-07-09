import { React, useState, useContext } from "react";
import classes from "./Login.module.scss";
import ForgotPasswordIMG from "../../images/advertisment.png";
import { Link } from "react-router-dom";
import AuthContext from "../../authContext/AuthContext";
import LoginIcon from "@mui/icons-material/Login";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const [emailValid, setEmailValid] = useState(true);

  const manageLogin = (e) => {
    e.preventDefault();
    try {
      const res = login({ email: emailData, password: passwordData });
      console.log(res);
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
      <div className={classes.stepperContainer}>
        <h1 className={classes.title}>Login</h1>
      </div>
      <div className={classes.changePassword}>
        <img src={ForgotPasswordIMG} alt="Forgot_Password_IMG" />
        <div className={classes.steps}>
          <div className={classes.step1}>
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
            <button className={classes.option} onClick={(e) => manageLogin(e)}>
              <LoginIcon />
              Login
            </button>
            <div className={classes.userOption}>
              Can't remember your password?
              <Link
                to="/forgotPassword"
                className={`${classes.btn} ${classes.goToForgotPassword}`}
              >
                Forgot Password
              </Link>
            </div>
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
    </div>
  );
};

export default Login;

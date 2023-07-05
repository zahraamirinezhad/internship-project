import { React, useState, useContext } from "react";
import classes from "./Login.module.scss";
import ForgotPasswordIMG from "../../images/advertisment.png";
import Next from "../../images/next.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { login } from "../../authContext/apiCalls";

const Login = () => {
  const [userNameData, setUserNameData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const { dispatch } = useContext(AuthContext);

  const manageLogin = (e) => {
    e.preventDefault();
    login({ userNameData, passwordData }, dispatch);
  };

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
              <label>Username</label>
              <input
                type="text"
                onChange={(value) => {
                  setUserNameData(value.target.value);
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
              <img src={Next} alt="login" />
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

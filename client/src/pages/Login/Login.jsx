import { React, useState, useContext } from "react";
import classes from "./Login.module.scss";
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
      <div className={classes.dark_cover}></div>
      <div className={classes.titleContainer}>
        <h1 className={classes.title}>Login</h1>
      </div>
      <div className={classes.changePassword}>
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
          <button className={classes.option} onClick={(e) => manageLogin(e)}>
            <LoginIcon />
            Login
          </button>
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

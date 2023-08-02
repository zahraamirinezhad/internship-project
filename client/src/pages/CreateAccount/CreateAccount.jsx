import { React, useState } from "react";
import classes from "./CreateAccount.module.scss";
import SignUp from "../../images/SignUp.png";
import PasswordChecklist from "react-password-checklist";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Snackbar, Alert } from "@mui/material";

const CreateAccount = () => {
  const navigate = useNavigate();

  const [userNameData, setUserNameData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const [repeatedPasswordData, setRepeatedPasswordData] = useState("");
  const [emailData, setEmailData] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userStudentNumber, setUserStudentNumber] = useState(0);
  const [userGender, setUserGender] = useState("male");
  const [userBirthDate, setUserBirthDate] = useState(new Date());
  const [userCountry, setUserCountry] = useState("");
  const [userState, setUserState] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userBio, setUserBio] = useState("");

  const [isTeacher, setIsTeacher] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [dataComplete, setDataComplete] = useState(false);

  const manageRegister = async (e) => {
    if (
      password_validate(passwordData) &&
      repeatedPasswordData !== passwordData &&
      validateEmail(emailData) &&
      userNameData !== "" &&
      userFirstName !== "" &&
      userLastName !== "" &&
      userStudentNumber !== 0 &&
      userCountry !== "" &&
      userState !== "" &&
      userCity !== "" &&
      userAddress !== "" &&
      userBio !== ""
    ) {
      e.preventDefault();
      try {
        const apiResponse = await axios.post(
          `${process.env.REACT_APP_API_ADDRESS}auth/register/`,
          {
            email: emailData,
            username: userNameData,
            password: passwordData,
            firstName: userFirstName,
            lastName: userLastName,
            isTeacher: isTeacher,
            studentNumber: isTeacher ? null : userStudentNumber,
            birthDate: userBirthDate,
            gender: userGender,
            bio: userBio,
            country: userCountry,
            state: userState,
            city: userCity,
            address: userAddress,
          }
        );
        console.log(apiResponse);
        localStorage.setItem(
          "tokens",
          JSON.stringify(apiResponse.data.accessToken)
        );
        localStorage.setItem("isTeacher", isTeacher);
        isTeacher
          ? navigate("/teacher/mainPage")
          : navigate("/student/mainPage");
      } catch (err) {
        console.log(err);
      }
    } else {
      setDataComplete(true);
    }
  };

  const password_validate = (password) => {
    var re = {
      small: /(?=.*[a-z])/,
      length: /(?=.{8}$)/,
      specialChar: /[ -\/:-@\[-\`{-~]/,
      digit: /(?=.*[0-9])/,
    };
    return (
      re.small.test(password) &&
      re.length.test(password) &&
      re.specialChar.test(password) &&
      re.digit.test(password)
    );
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
      <div className={classes.createAccount}>
        <div className={classes.borderLine}></div>
        <div className={classes.form}>
          <div className={classes.enterData}>
            <input
              type="text"
              onChange={(value) => {
                setUserNameData(value.target.value);
              }}
              required
            />
            <span>Username</span>
            <i></i>
          </div>
          <div className={classes.enterData}>
            <input
              className={`${!emailValid && classes.invalidEmail}`}
              type="email"
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
              type="text"
              value={userFirstName}
              onChange={(e) => {
                setUserFirstName(e.target.value);
              }}
              required
            />
            <span>First Name</span>
            <i></i>
          </div>
          <div className={classes.enterData}>
            <input
              type="text"
              value={userLastName}
              onChange={(e) => {
                setUserLastName(e.target.value);
              }}
              required
            />
            <span>Last Name</span>
            <i></i>
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
                  required
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
                required
              />
            </div>
          </div>
          <div className={classes.sideBySide}>
            <div className={classes.enterDataLinear}>
              <label>Gender</label>
              <select
                value={userGender}
                name="gender"
                onChange={(e) => {
                  setUserGender(e.target.value);
                }}
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className={classes.enterDataLinear}>
              <label>Birth Date</label>
              <DatePicker
                selected={new Date(userBirthDate)}
                onChange={(date) => setUserBirthDate(date)}
                minDate={new Date("1923-01-01")}
                maxDate={new Date()}
                dateFormat="yyyy-MM-dd"
                required
              />
            </div>
          </div>
          <div className={classes.enterData}>
            <input
              type="text"
              value={userCountry}
              onChange={(e) => {
                setUserCountry(e.target.value);
              }}
              required
            />
            <span>Country</span>
            <i></i>
          </div>
          <div className={classes.enterData}>
            <input
              type="text"
              value={userState}
              onChange={(e) => {
                setUserState(e.target.value);
              }}
              required
            />
            <span>State</span>
            <i></i>
          </div>
          <div className={classes.enterData}>
            <input
              type="text"
              value={userCity}
              onChange={(e) => {
                setUserCity(e.target.value);
              }}
              required
            />
            <span>City</span>
            <i></i>
          </div>
          <div className={`${classes.enterData} ${classes.longData}`}>
            <textarea
              type="text"
              rows={4}
              value={userAddress}
              onChange={(e) => {
                setUserAddress(e.target.value);
              }}
              required
            />
            <span>Address</span>
            <i></i>
          </div>
          <div className={`${classes.enterData} ${classes.longData}`}>
            <textarea
              type="text"
              value={userBio}
              onChange={(e) => {
                setUserBio(e.target.value);
              }}
              required
            />
            <span>Bio</span>
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
          <div className={classes.enterData}>
            <input
              type={passwordVisible ? "text" : "password"}
              onChange={(value) => {
                setRepeatedPasswordData(value.target.value);
              }}
              required
            />
            <span>Repeat your password</span>
            <i></i>
            <button
              onClick={() => {
                setPasswordVisible(!passwordVisible);
              }}
            >
              {passwordVisible ? <Visibility /> : <VisibilityOff />}
            </button>
          </div>
          <div className={classes.passwordCondotions}>
            <PasswordChecklist
              rules={["minLength", "specialChar", "number"]}
              minLength={8}
              value={passwordData}
              onChange={(isValid) => {}}
              messages={{
                minLength: "The minimum length of the password must be eight.",
                specialChar: "The password must have special characters.",
                number: "The password must have a number.",
              }}
            />
          </div>
          <button className={classes.option} onClick={(e) => manageRegister(e)}>
            <img src={SignUp} alt="sign_up" />
            Sign Up
          </button>
          <div className={classes.goToLogin}>
            Already have an account?
            <Link to="/login" className={classes.btn}>
              Login
            </Link>
          </div>
        </div>
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

export default CreateAccount;

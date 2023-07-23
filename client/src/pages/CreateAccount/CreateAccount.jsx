import { React, useState } from "react";
import classes from "./CreateAccount.module.scss";
import SignUp from "../../images/SignUp.png";
import PasswordChecklist from "react-password-checklist";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const navigate = useNavigate();

  const [userNameData, setUserNameData] = useState("");
  const [passwordData, setPasswordData] = useState("");
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

  const manageRegister = async (e) => {
    if (password_validate(passwordData) && validateEmail(emailData)) {
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
      <div className={classes.dark_cover}></div>
      <div className={classes.titleContainer}>
        <h1 className={classes.title}>Create Account</h1>
      </div>
      <div className={classes.createAccount}>
        <div className={classes.steps}>
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
            <label>Email</label>
            <input
              className={`${!emailValid && classes.invalidEmail}`}
              type="email"
              onChange={(value) => {
                manageEmailValidation(value.target.value);
              }}
            />
          </div>
          <div className={classes.enterData}>
            <label>First Name</label>
            <input
              type="text"
              value={userFirstName}
              onChange={(e) => {
                setUserFirstName(e.target.value);
              }}
            />
          </div>
          <div className={classes.enterData}>
            <label>Last Name</label>
            <input
              type="text"
              value={userLastName}
              onChange={(e) => {
                setUserLastName(e.target.value);
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
          <div className={classes.sideBySide}>
            <div className={classes.enterDataLinear}>
              <label>Gender</label>
              <select
                value={userGender}
                name="gender"
                onChange={(e) => {
                  setUserGender(e.target.value);
                }}
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
              />
            </div>
          </div>
          <div className={classes.enterData}>
            <label>Country</label>
            <input
              className={classes.shortData}
              type="text"
              value={userCountry}
              onChange={(e) => {
                setUserCountry(e.target.value);
              }}
            />
          </div>
          <div className={classes.enterData}>
            <label>State</label>
            <input
              className={classes.shortData}
              type="text"
              value={userState}
              onChange={(e) => {
                setUserState(e.target.value);
              }}
            />
          </div>
          <div className={classes.enterData}>
            <label>City</label>
            <input
              className={classes.shortData}
              type="text"
              value={userCity}
              onChange={(e) => {
                setUserCity(e.target.value);
              }}
            />
          </div>
          <div className={classes.enterData}>
            <label>Address</label>
            <textarea
              type="text"
              rows={4}
              value={userAddress}
              onChange={(e) => {
                setUserAddress(e.target.value);
              }}
            />
          </div>
          <div className={classes.enterData}>
            <label>Bio</label>
            <textarea
              type="text"
              value={userBio}
              onChange={(e) => {
                setUserBio(e.target.value);
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
          <div>
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
            Have an account?
            <Link to="/login" className={classes.btn}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;

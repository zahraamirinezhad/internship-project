import { React, useEffect, useState } from "react";
import classes from "./Profile.module.scss";
import UserProfile from "../../images/user (2).png";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const Profile = ({ token, isTeacher }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [userFirstName, setUserFirstName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  const [userGender, setUserGender] = useState(null);
  const [userBirthDate, setUserBirthDate] = useState(null);
  const [userAddress, setUserAddress] = useState(" ");
  const [userUserName, setUserUserName] = useState(null);
  const [userBio, setUserBio] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        let res = null;
        if (isTeacher) {
          res = await axios.get(
            `${process.env.REACT_APP_API_ADDRESS}teachers/find`,
            {
              headers: {
                token: `Bearer ${token}`,
              },
            }
          );
        } else {
          res = await axios.get(
            `${process.env.REACT_APP_API_ADDRESS}students/find`,
            {
              headers: {
                token: `Bearer ${token}`,
              },
            }
          );
        }
        console.log(res.data);
        setUserProfile(
          res.data.profilePic === null
            ? UserProfile
            : `http://localhost:8800/${res.data.profilePic}`
        );
        setUserFirstName(res.data.firstName);
        setUserLastName(res.data.lastName);
        setUserGender(res.data.gender);
        setUserBio(res.data.bio);
        setUserBirthDate(
          res.data.birthDate !== null ? res.data.birthDate.slice(0, 10) : null
        );
        setUserAddress(
          `${res.data.country}\n${res.data.state}\n${res.data.city}\n${res.data.address}`
        );
        setUserUserName(res.data.username);

        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  return (
    <div className={classes.body}>
      <h2>Profile</h2>
      <div className={classes.profileInfo}>
        <div className={classes.info}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <img
              src={userProfile}
              alt="User_Profile"
              className={classes.profileImage}
            />
          )}
          <div className={classes.userPersonalInfo}>
            <div className={classes.slide}>
              <div className={classes.enterInfo}>
                <label>Username</label>
                <input
                  value={userUserName}
                  readOnly
                  className={`${classes.smallData} ${
                    isLoading && classes.isLoading
                  }`}
                />
              </div>
              <div className={classes.sideBySide}>
                <div className={classes.enterGender}>
                  <label>Gender</label>
                  <input
                    value={userGender}
                    readOnly
                    className={`${classes.largeData} ${
                      isLoading && classes.isLoading
                    }`}
                  />
                </div>
                <div className={classes.enterBirthDate}>
                  <label>Birth Date</label>
                  <input
                    value={userBirthDate}
                    readOnly
                    className={`${classes.smallData} ${
                      isLoading && classes.isLoading
                    }`}
                  />
                </div>
              </div>
              <div className={classes.enterInfo}>
                <label>Bio</label>
                <textarea
                  value={userBio}
                  className={`${classes.largeData} ${
                    isLoading && classes.isLoading
                  }`}
                />
              </div>
            </div>
            <div className={classes.slide}>
              <div className={classes.enterInfo}>
                <label>First Name</label>
                <input
                  value={userFirstName}
                  readOnly
                  className={`${classes.smallData} ${
                    isLoading && classes.isLoading
                  }`}
                />
              </div>
              <div className={classes.enterInfo}>
                <label>Last Name</label>
                <input
                  value={userLastName}
                  readOnly
                  className={`${classes.smallData} ${
                    isLoading && classes.isLoading
                  }`}
                />
              </div>

              <div className={classes.enterInfo}>
                <label>Address</label>
                <textarea
                  value={userAddress}
                  className={`${classes.largeData} ${
                    isLoading && classes.isLoading
                  }`}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

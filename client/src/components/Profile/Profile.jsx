import { React, useEffect, useState } from "react";
import classes from "./Profile.module.scss";
import UserProfile from "../../images/user (2).png";
import Next from "../../images/next.png";
import Previous from "../../images/prev.png";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const Profile = ({ token }) => {
  const [nextPage, setNextPage] = useState("first");
  const [userProfile, setUserProfile] = useState(null);
  const [userFirstName, setUserFirstName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  const [userGender, setUserGender] = useState(null);
  const [userBirthDate, setUserBirthDate] = useState(null);
  const [userCountry, setUserCountry] = useState(" ");
  const [userState, setUserState] = useState(" ");
  const [userCity, setUserCity] = useState(" ");
  const [userAddress, setUserAddress] = useState(" ");
  const [userUserName, setUserUserName] = useState(null);
  const [userBio, setUserBio] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const handleNext = () => {
    setNextPage("sec");
  };

  const handlePrev = () => {
    setNextPage("first");
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}users/find`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log(res);
        setUserProfile(res.data.profilePic);
        setUserFirstName(res.data.firstName);
        setUserLastName(res.data.lastName);
        setUserGender(res.data.gender);
        setUserBio(res.data.bio);
        setUserBirthDate(res.data.birthDate.slice(0, 10));
        setUserCountry(res.data.country);
        setUserState(res.data.state);
        setUserCity(res.data.city);
        setUserAddress(res.data.address);
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
          <img
            src={UserProfile}
            alt="User_Profile"
            className={classes.profileImage}
          />
          <div className={classes.userPersonalInfo}>
            <div className={classes.slide}>
              <div className={classes.enterInfo}>
                <label>Username</label>
                <p>{userUserName}</p>
              </div>
              <div className={classes.sideBySide}>
                <div className={classes.enterGender}>
                  <label>Gender</label>
                  <p>{userGender}</p>
                </div>
                <div className={classes.enterBirthDate}>
                  <label>Birth Date</label>
                  <p>{userBirthDate}</p>
                </div>
              </div>
              <div className={classes.enterInfo}>
                <label>Bio</label>
                <textarea
                  type="text"
                  value={userBio}
                  onChange={(e) => {
                    setUserBio(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className={classes.slide}>
              <div className={classes.enterInfo}>
                <label>First Name</label>
                <p>{userFirstName}</p>
              </div>
              <div className={classes.enterInfo}>
                <label>Last Name</label>
                <p>{userLastName}</p>
              </div>

              <div className={classes.enterInfo}>
                <label>Address</label>
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <textarea
                    rows={4}
                  >{`${userCountry}-${userState}-${userCity}-${userAddress}`}</textarea>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

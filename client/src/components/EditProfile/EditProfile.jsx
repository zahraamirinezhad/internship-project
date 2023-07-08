import { React, useState, useEffect } from "react";
import classes from "./EditProfile.module.scss";
import UserProfile from "../../images/user (2).png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Apply from "../../images/apply.png";
import { CircularProgress } from "@mui/material";

const EditProfile = ({ token }) => {
  const [mainUserName, setMainUserName] = useState("");
  const [selectedProfile, setUserSelectedProfile] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userFirstName, setUserFirstName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  const [userGender, setUserGender] = useState("male");
  const [userBirthDate, setUserBirthDate] = useState(new Date());
  const [userCountry, setUserCountry] = useState(null);
  const [userState, setUserState] = useState(null);
  const [userCity, setUserCity] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [userUserName, setUserUserName] = useState(null);
  const [userBio, setUserBio] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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
        res.data.profilePic !== "" &&
          setUserProfile(
            `http://api.iwantnet.space:8001${res.data.profile_image}`
          );

        setUserFirstName(res.data.firstName);
        setUserLastName(res.data.lastName);
        res.data.gender !== "other" && setUserGender(res.data.gender);
        setUserBio(res.data.bio);
        res.data.birth_date !== null && setUserBirthDate(res.data.birthDate);
        setUserCountry(res.data.country);
        setUserState(res.data.state);
        setUserCity(res.data.city);
        setUserAddress(res.data.address);
        setUserUserName(res.data.username);
        setMainUserName(res.data.username);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  const changeUserInfo = async () => {
    setIsUploading(true);
    const formData = new FormData();
    if (userUserName !== mainUserName) {
      formData.append("username", userUserName);
    }
    console.log(userBirthDate);
    formData.append("firstName", userFirstName);
    formData.append("lastName", userLastName);
    formData.append("birthDate", userBirthDate);
    formData.append("gender", userGender);
    formData.append("bio", userBio);
    formData.append("country", userCountry);
    formData.append("state", userState);
    formData.append("city", userCity);
    formData.append("address", userAddress);
    console.log(userCountry);
    if (selectedProfile !== null) {
      formData.append("profile_image", selectedProfile);
    }

    for (const value of formData.values()) {
      console.log(value);
    }

    await uploadNewUserData(formData);
  };

  const uploadNewUserData = async (formData) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_ADDRESS}users/update`,
        formData,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      setIsUploading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUploadedImage = (e) => {
    console.log(e.target.files[0]);
    setUserSelectedProfile(e.target.files[0]);
    setUserProfile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className={classes.container}>
      <div className={classes.body}>
        <h2>Edit Profile</h2>

        <div className={classes.profileInfo}>
          <div className={classes.userInfo}>
            <div className={classes.info}>
              <div className={classes.profileImage}>
                <input
                  id="selectProfileImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleUploadedImage(e);
                  }}
                />
                <label for="selectProfileImage">
                  <img
                    src={userProfile == null ? UserProfile : userProfile}
                    alt="User_Profile"
                  />
                </label>
              </div>
              <div className={classes.userPersonalInfo}>
                <div className={classes.enterInfo}>
                  <label>First Name</label>
                  <input
                    type="text"
                    value={userFirstName}
                    onChange={(e) => {
                      setUserFirstName(e.target.value);
                    }}
                  />
                </div>
                <div className={classes.enterInfo}>
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={userLastName}
                    onChange={(e) => {
                      setUserLastName(e.target.value);
                    }}
                  />
                </div>
                <div className={classes.sideBySide}>
                  <div className={classes.enterGender}>
                    <label>Gender</label>
                    <select
                      name="gender"
                      onChange={(e) => {
                        setUserGender(e.target.value);
                      }}
                    >
                      {userGender === "male" && (
                        <>
                          <option value="male" selected>
                            Male
                          </option>
                          <option value="female">Female</option>
                        </>
                      )}
                      {userGender === "female" && (
                        <>
                          <option value="male">Male</option>
                          <option value="female" selected>
                            Female
                          </option>
                        </>
                      )}
                    </select>
                  </div>
                  <div className={classes.enterBirthDate}>
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
                <div className={classes.enterAddress}>
                  <div>
                    <label>Country</label>
                    <input
                      type="text"
                      value={userCountry}
                      onChange={(e) => {
                        setUserCountry(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label>State</label>
                    <input
                      type="text"
                      value={userState}
                      onChange={(e) => {
                        setUserState(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label>City</label>
                    <input
                      type="text"
                      value={userCity}
                      onChange={(e) => {
                        setUserCity(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className={classes.enterInfo}>
                  <label>Address</label>
                  <input
                    type="text"
                    value={userAddress}
                    onChange={(e) => {
                      setUserAddress(e.target.value);
                    }}
                  />
                </div>
                <div className={classes.enterInfo}>
                  <label>Username</label>
                  <input
                    type="text"
                    value={userUserName}
                    onChange={(e) => {
                      setUserUserName(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={classes.bio}>
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
          <div className={classes.options}>
            {isUploading ? (
              <CircularProgress />
            ) : (
              <button onClick={changeUserInfo}>
                <img src={Apply} alt="apply" />
                Apply
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

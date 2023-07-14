import { React, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const getAccessToken = () => {
    if (localStorage.getItem("tokens")) {
      let tokens = JSON.parse(localStorage.getItem("tokens"));
      console.log(tokens);
      return tokens;
    }
    return null;
  };

  const navigate = useNavigate();

  const login = async (payload) => {
    console.log(payload);
    const apiResponse = await axios.post(
      `${process.env.REACT_APP_API_ADDRESS}auth/login/`,
      payload
    );
    console.log(apiResponse);
    localStorage.setItem(
      "tokens",
      JSON.stringify(apiResponse.data.accessToken)
    );
    navigate("/mainPage");
  };

  const register = async (payload) => {
    console.log(payload);
    const apiResponse = await axios.post(
      `${process.env.REACT_APP_API_ADDRESS}auth/register/`,
      payload
    );
    console.log(apiResponse);
    localStorage.setItem(
      "tokens",
      JSON.stringify(apiResponse.data.accessToken)
    );
    navigate("/mainPage");
  };

  return (
    <AuthContext.Provider value={{ getAccessToken, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

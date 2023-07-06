import { React } from "react";
import classes from "./MainContainer.module.scss";
import { Header } from "../../components";
import { useLocation } from "react-router-dom";
import { MainPage, ProfileStructure } from "../";

const MainContainer = ({ token }) => {
  const location = useLocation();
  console.log(location.pathname.split("/"));
  const url = location.pathname.split("/")[1];
  console.log(url);

  return (
    <div className={classes.container}>
      <div className={classes.container}>
        <Header token={token} />
        <div className={classes.body}>
          {
            {
              mainPage: <MainPage token={token} />,
              profileStructure: <ProfileStructure token={token} />,
            }[url]
          }
        </div>
      </div>
    </div>
  );
};

export default MainContainer;

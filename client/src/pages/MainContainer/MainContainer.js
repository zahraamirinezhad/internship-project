import { React } from "react";
import classes from "./MainContainer.module.scss";
import { Header } from "../../components";

const MainContainer = ({ token }) => {
  return (
    <div className={classes.container}>
      <div className={classes.container}>
        <Header token={token} />
        <div className={classes.body}>{}</div>
      </div>
    </div>
  );
};

export default MainContainer;

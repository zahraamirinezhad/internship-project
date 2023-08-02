import React from "react";
import classes from "./Cofee.module.scss";

const Cofee = () => {
  return (
    <div className={classes.container}>
      <div className={classes.plate}></div>
      <div className={classes.cup}>
        <div className={classes.top}>
          <div className={classes.vapour}>
            <span style={{ "--i": 1 }}></span>
            <span style={{ "--i": 3 }}></span>
            <span style={{ "--i": 16 }}></span>
            <span style={{ "--i": 5 }}></span>
            <span style={{ "--i": 13 }}></span>
            <span style={{ "--i": 20 }}></span>
            <span style={{ "--i": 6 }}></span>
            <span style={{ "--i": 7 }}></span>
            <span style={{ "--i": 10 }}></span>
            <span style={{ "--i": 8 }}></span>
            <span style={{ "--i": 17 }}></span>
            <span style={{ "--i": 11 }}></span>
            <span style={{ "--i": 12 }}></span>
            <span style={{ "--i": 14 }}></span>
            <span style={{ "--i": 2 }}></span>
          </div>
          <div className={classes.circle}>
            <div className={classes.tea}></div>
          </div>
        </div>
        <div className={classes.handle}></div>
      </div>
    </div>
  );
};

export default Cofee;

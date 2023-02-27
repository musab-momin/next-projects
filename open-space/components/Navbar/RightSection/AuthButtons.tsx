import React from "react";
import classes from "./rightsection.module.css";

type authButtonsProps = {};

const AuthButtons: React.FC<authButtonsProps> = () => {
  return (
    <div className={classes.btngrop}>
      <button className="primary-outline-btn mr">Log in</button>
      <button className="primary-btn">sign up</button>
    </div>
  );
};

export default AuthButtons;

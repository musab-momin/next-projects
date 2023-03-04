import React from "react";
import classes from "./rightsection.module.css";
import { useGlobalAppApiContext } from "@/contexts/GlobalAppContext";

type authButtonsProps = {};

const AuthButtons: React.FC<authButtonsProps> = () => {
  const { openModal } = useGlobalAppApiContext();

  const openModalAsLogin = () => {
    openModal("login");
  };

  const openModalAsSignup = () => {
    openModal("signup");
  };

  return (
    <div className={classes.btngrop}>
      <button className="primary-outline-btn mr" onClick={openModalAsLogin}>
        Log in
      </button>
      <button className="primary-btn" onClick={openModalAsSignup}>
        sign up
      </button>
    </div>
  );
};

export default AuthButtons;

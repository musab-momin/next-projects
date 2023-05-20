import React from "react";
import classes from "./rightsection.module.css";
import { useGlobalAppApiContext } from "@/contexts/GlobalAppContext";
import useUserAuth from "@/utils/shared-hooks/useUserAuth";
import LoggedInActions from "./LoggedInActions/LoggedInActions";

type authButtonsProps = {
  user: any;
};

const AuthButtons: React.FC<authButtonsProps> = ({ user }) => {
  const { openModal } = useGlobalAppApiContext();
  const openModalAsLogin = () => {
    openModal("login");
  };

  const openModalAsSignup = () => {
    openModal("signup");
  };

  return (
    <>
      {!user ? (
        <>
          <button className="primary-outline-btn mr" onClick={openModalAsLogin}>
            Log in
          </button>
          <button className="primary-btn" onClick={openModalAsSignup}>
            sign up
          </button>
        </>
      ) : (
        <LoggedInActions />
      )}
    </>
  );
};

export default AuthButtons;

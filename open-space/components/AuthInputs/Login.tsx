import React, { useState } from "react";
import classes from "./authinputs.module.css";
import { useGlobalAppApiContext } from "@/contexts/GlobalAppContext";

type loginProps = {};

const Login: React.FC<loginProps> = () => {
  const { openModal } = useGlobalAppApiContext();

  const [loginInputs, setLoginInputs] = useState({
    username: "",
    password: "",
  });

  const onInputChange = (eve: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = eve.currentTarget;
    setLoginInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openModalAsSignup = () => {
    openModal("signup");
  };

  return (
    <>
      <form className={classes.frm}>
        <input
          required
          type="text"
          className="inp"
          name="username"
          placeholder="USERNAME"
          value={loginInputs.username}
          onChange={(eve) => onInputChange(eve)}
        />
        <input
          required
          type="password"
          className="inp"
          name="password"
          placeholder="PASSWORD"
          value={loginInputs.password}
          onChange={(eve) => onInputChange(eve)}
        />
        <button type="submit" className="frm-btn">
          LOG IN
        </button>
        <div>
          <small>New to OpenSpace?</small>{" "}
          <button
            type="button"
            className="link-btn"
            onClick={openModalAsSignup}
          >
            Sign up
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;

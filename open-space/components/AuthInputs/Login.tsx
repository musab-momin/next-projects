import React, { useState } from "react";
import classes from "./authinputs.module.css";
import { useGlobalAppApiContext } from "@/contexts/GlobalAppContext";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

type loginProps = {};

const FIREBASE_ERROR: any = {
  "Firebase: Error (auth/user-not-found).": "Account didn't exist, try signup",
  "Firebase: Error (auth/wrong-password).": "Password is not correct!",
};

const Login: React.FC<loginProps> = () => {
  const { openModal, successToaster, errorToaster, closeModal } =
    useGlobalAppApiContext();
  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [loginInputs, setLoginInputs] = useState({
    useremail: "",
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

  const onSubmit = (eve: React.FormEvent<HTMLFormElement>) => {
    eve.preventDefault();
    signInWithEmailAndPassword(loginInputs.useremail, loginInputs.password)
      .then((res: any) => {
        if (!res) {
          errorToaster(
            FIREBASE_ERROR[`${error?.message}`] || "Something went wrong!"
          );
        } else {
          successToaster("You are loggedin successfully!!");
          closeModal();
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <form className={classes.frm} onSubmit={onSubmit}>
      <input
        required
        type="email"
        className="inp"
        name="useremail"
        placeholder="EMAIL"
        value={loginInputs.useremail}
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
      <button
        type="submit"
        className={`frm-btn ${loading ? "btn-loading" : ""}`}
      >
        LOG IN
      </button>
      <div>
        <small>New to OpenSpace?</small>{" "}
        <button type="button" className="link-btn" onClick={openModalAsSignup}>
          Sign up
        </button>
      </div>
    </form>
  );
};

export default Login;

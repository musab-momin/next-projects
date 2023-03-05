import React, { useEffect, useState } from "react";
import classes from "./authinputs.module.css";
import { useGlobalAppApiContext } from "@/contexts/GlobalAppContext";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

type signupProps = {};

const Signup: React.FC<signupProps> = () => {
  const { openModal } = useGlobalAppApiContext();

  const [formValues, setformValues] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [validation, setValidation] = useState({
    isError: false,
    mssg: "",
  });
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const onInputChange = (eve: React.ChangeEvent<HTMLInputElement>) => {
    validation.isError && setValidation({ isError: false, mssg: "" });
    const { name, value } = eve.currentTarget;
    setformValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openModalAsLogin = () => {
    openModal("login");
  };

  const onSubmit = (eve: React.FormEvent<HTMLFormElement>) => {
    eve.preventDefault();
    console.log({ error });
    if (formValues.password !== formValues.confirm_password) {
      setValidation({ isError: true, mssg: "Password did not matched" });
      return;
    }
    createUserWithEmailAndPassword(formValues.email, formValues.password);
  };

  useEffect(() => {
    if (!validation.isError && error) {
      setValidation({
        isError: true,
        mssg:
          error?.message
            .replace("Firebase:", "")
            .replace("(auth/weak-password).", "") ||
          "something went wrong, please try again!",
      });
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <>
      <form className={classes.frm} onSubmit={onSubmit}>
        <input
          required
          type="text"
          className="inp"
          name="username"
          placeholder="USERNAME"
          value={formValues.username}
          onChange={(eve) => onInputChange(eve)}
        />
        <input
          required
          type="email"
          className="inp"
          name="email"
          placeholder="EMAIL"
          value={formValues.email}
          onChange={(eve) => onInputChange(eve)}
        />
        <input
          required
          type="password"
          className="inp"
          name="password"
          placeholder="PASSWORD"
          value={formValues.password}
          onChange={(eve) => onInputChange(eve)}
        />
        <input
          required
          type="password"
          className="inp"
          name="confirm_password"
          placeholder="CONFIRM PASSWORD"
          value={formValues.confirm_password}
          onChange={(eve) => onInputChange(eve)}
        />
        {validation.isError && (
          <div className="text-center">
            <small className="err-txt">{validation.mssg}</small>
          </div>
        )}
        <button
          type="submit"
          className={`frm-btn ${loading ? "btn-loading" : ""}`}
        >
          Sign Up
        </button>
        <div>
          <small>Already into OpenSpace?</small>{" "}
          <button type="button" className="link-btn" onClick={openModalAsLogin}>
            Log in
          </button>
        </div>
      </form>
    </>
  );
};

export default Signup;

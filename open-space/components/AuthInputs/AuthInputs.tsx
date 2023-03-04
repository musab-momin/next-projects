import { useGlobalAppContex } from "@/contexts/GlobalAppContext";
import React from "react";
import Login from "./Login";
import Signup from "./Signup";

type authInputsProps = {};

const AuthInputs: React.FC<authInputsProps> = () => {
  const {
    modalState: { view },
  } = useGlobalAppContex();

  return (
    <>
      <div>
        {view === "login" && <Login />}
        {view === "signup" && <Signup />}
      </div>
    </>
  );
};

export default AuthInputs;

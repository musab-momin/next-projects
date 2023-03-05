import React from "react";
import classes from "./authinputs.module.css";
import Image from "next/image";

const OAuthButtons: React.FC = () => {
  return (
    <div className={classes.frm}>
      <button type="button" className={`"normalise-btn" ${classes.authBtn}`}>
        <Image
          src="/images/icons/icons8-google.svg"
          alt="#"
          width={22}
          height={22}
        />
        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default OAuthButtons;

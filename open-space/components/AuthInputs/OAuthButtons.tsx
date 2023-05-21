import React, { useCallback, useEffect } from "react";
import classes from "./authinputs.module.css";
import Image from "next/image";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/clientApp";
import { useGlobalAppApiContext } from "@/contexts/GlobalAppContext";
import { doc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";

const OAuthButtons: React.FC = () => {
  const { successToaster, errorToaster, closeModal } = useGlobalAppApiContext();
  const [createUserWithGoogle, userCred, , error] = useSignInWithGoogle(auth);

  const actionWrapper = () => {
    createUserWithGoogle()
      .then((res: any) => {
        if (!!res) {
          successToaster("You are loggedin into OpenSpace");
        } else {
          errorToaster(
            error?.message
              .replace("Firebase:", "")
              .replace("(auth/weak-password).", "") ||
              "something went wrong, please try again!"
          );
        }
      })
      .catch((err: any) => {
        !!err && errorToaster("Something went wrong, Please try again!!");
      });
  };
  //wrapped this function in callback bcoz it is in dependency of below useEffect
  const createUserDocument = useCallback(
    async (user: User) => {
      const docRef = doc(firestore, "users", user.uid);
      await setDoc(docRef, user);
      closeModal();
    },
    [closeModal]
  );
  useEffect(() => {
    if (userCred) {
      createUserDocument(JSON.parse(JSON.stringify(userCred?.user)));
    }
  }, [userCred, createUserDocument]);
  return (
    <div className={classes.frm}>
      <button
        type="button"
        className={`"normalise-btn" ${classes.authBtn}`}
        onClick={actionWrapper}
      >
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

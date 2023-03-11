import React, { useEffect } from "react";
import classes from "./toaster.module.css";
import {
  useGlobalAppApiContext,
  useGlobalAppContex,
} from "@/contexts/GlobalAppContext";

const Toaster: React.FC = () => {
  const { toasterState } = useGlobalAppContex();
  const { closeToaster } = useGlobalAppApiContext();
  const { isActive, mssg, type } = toasterState;
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        closeToaster();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toasterState, closeToaster, isActive]);
  return (
    <>
      {isActive && (
        <div
          className={`${classes.container} ${classes.type} ${
            isActive ? classes.containerAnimation : ""
          }`}
        >
          {mssg}
        </div>
      )}
    </>
  );
};

export default Toaster;

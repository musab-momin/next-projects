import { useGlobalAppApiContext } from "@/contexts/GlobalAppContext";
import { auth } from "@/firebase/clientApp";
import { signOut } from "firebase/auth";
import { BsChatDots } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";
import classes from "./loggedinactions.module.css";
import React from "react";
import Dropdown from "@/components/Common/Dropdown/Dropdown";
import useUserAuth from "@/utils/shared-hooks/useUserAuth";
import { RiNotification3Line } from "react-icons/ri";

type LoggedInActions = {};

const LoggedInActions: React.FC<LoggedInActions> = () => {
  const { successToaster } = useGlobalAppApiContext();
  const { user } = useUserAuth();

  const handleLogout = () => {
    signOut(auth);
    successToaster("Loggedout successfully!");
  };
  return (
    <div className={classes.container}>
      <button className="normalise-btn">
        <BsChatDots size={22} />
      </button>
      {/* <button className="normalise-btn">
        <RiNotification3Line size={22} />
      </button> */}
      <Dropdown
        parentIcon={
          <button className="normalise-btn always-flex">
            <BiUserCircle size={22} />
            <span className="capitalise">
              {user?.displayName || user?.email?.split("@")[0]}
            </span>
          </button>
        }
      >
        <ul>
          <li>
            <button
              type="button"
              className="link-btn always-flex "
              onClick={handleLogout}
            >
              <span>Profile</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="link-btn always-flex"
              onClick={handleLogout}
            >
              <span>
                <FiLogOut />
              </span>
              <span> Logout</span>
            </button>
          </li>
        </ul>
      </Dropdown>
    </div>
  );
};

export default LoggedInActions;

import { AiFillHome } from "react-icons/ai";
import classes from "../RightSection/LoggedInActions/loggedinactions.module.css";
import React from "react";
import Dropdown from "@/components/Common/Dropdown/Dropdown";
import Communities from "./Communities";

const Directory: React.FC = () => {
  return (
    <div className={`${classes.container} ${classes.containerBorder}`}>
      <Dropdown
        parentIcon={
          <button className="normalise-btn always-flex">
            <AiFillHome size={22} />
          </button>
        }
        centre
      >
        <ul>
          <li>
            <Communities />
          </li>
        </ul>
      </Dropdown>
    </div>
  );
};

export default Directory;

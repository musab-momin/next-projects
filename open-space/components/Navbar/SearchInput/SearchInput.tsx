import React from "react";
import classes from "./searchinput.module.css";
import { CiSearch } from "react-icons/ci";

type searchInputProps = {
  // user;
};

const SearchInput: React.FC<searchInputProps> = () => {
  return (
    <div style={{ width: "60%" }}>
      <div className={classes.inptgrp}>
        <div className={classes.iconWrapper}>
          <CiSearch size={22} />
        </div>
        <input
          type="search"
          className={classes.inp}
          placeholder="type to search..."
        />
      </div>
    </div>
  );
};

export default SearchInput;

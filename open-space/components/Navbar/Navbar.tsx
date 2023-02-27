import React from "react";
import classes from "./navbar.module.css";
import Image from "next/image";
import SearchInput from "./SearchInput/SearchInput";
import RightSection from "./RightSection/RightSection";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <header className={`${classes.header}`}>
      <nav className={`container ${classes.nav}`}>
        <div className={classes.imgContainer}>
          <Image src={"/images/logos/logo-no-background.svg"} alt={"#"} fill />
        </div>
        <SearchInput />
        <RightSection />
        {/* <Directory /> */}
      </nav>
    </header>
  );
};

export default Navbar;

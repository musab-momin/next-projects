import React from "react";
import classes from "./navbar.module.css";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import SearchInput from "./SearchInput/SearchInput";
import RightSection from "./RightSection/RightSection";
import useIsMobile from "@/utils/shared-hooks/useIsMobile";

type Props = {};

const Navbar = (props: Props) => {
  const isMobile = useIsMobile();
  return (
    <header className={`${classes.header}`}>
      <nav className={`container ${classes.nav}`}>
        <div className="flex-col">
          {isMobile && (
            <div className="mt-0">
              <button className="normalise-btn">
                <RxHamburgerMenu size={20} />
              </button>
            </div>
          )}
          <div className={classes.imgContainer}>
            <Image
              src={"/images/logos/logo-no-background.svg"}
              alt={"#"}
              fill
              priority
            />
          </div>
        </div>
        {!isMobile && <SearchInput />}
        <RightSection />
        {/* <Directory /> */}
      </nav>
    </header>
  );
};

export default Navbar;

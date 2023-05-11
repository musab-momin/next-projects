import React from "react";
import classes from "./navbar.module.css";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import SearchInput from "./SearchInput/SearchInput";
import RightSection from "./RightSection/RightSection";
import useIsMobile from "@/utils/shared-hooks/useIsMobile";
import Directory from "./Directory/Directory";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const isMobile = useIsMobile();
  return (
    <header className={`${classes.header}`}>
      <nav className={`container ${classes.nav}`}>
        <div className="always-flex">
          {isMobile && (
            <div className="mt-0">
              <button className="normalise-btn">
                <RxHamburgerMenu size={20} />
              </button>
            </div>
          )}
          <div className={`${classes.imgContainer}`}>
            <Image
              src={"/images/logos/logo-no-background.svg"}
              alt={"#"}
              fill
              priority
            />
          </div>
          <Directory />
        </div>
        {!isMobile && <SearchInput />}
        <RightSection />
      </nav>
    </header>
  );
};

export default Navbar;

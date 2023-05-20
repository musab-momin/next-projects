import React from "react";
import classes from "./navbar.module.css";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import SearchInput from "./SearchInput/SearchInput";
import RightSection from "./RightSection/RightSection";
import useIsMobile from "@/utils/shared-hooks/useIsMobile";
import Directory from "./Directory/Directory";
import useUserAuth from "@/utils/shared-hooks/useUserAuth";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const isMobile = useIsMobile();
  const { user, loading } = useUserAuth();

  if (loading) {
    return <></>;
  }
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
          {user && <Directory />}
        </div>
        {!isMobile && <SearchInput />}
        <RightSection user={user} />
      </nav>
    </header>
  );
};

export default Navbar;

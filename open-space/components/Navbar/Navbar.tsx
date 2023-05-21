import React from "react";
import classes from "./navbar.module.css";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import SearchInput from "./SearchInput/SearchInput";
import RightSection from "./RightSection/RightSection";
import useIsMobile from "@/utils/shared-hooks/useIsMobile";
import Directory from "./Directory/Directory";
import useUserAuth from "@/utils/shared-hooks/useUserAuth";
import Link from "next/link";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const isMobile = useIsMobile();
  const { user, loading } = useUserAuth();

  if (loading) {
    return (
      <div className={classes.shimmerNav}>
        <div className={classes.shimmer}></div>
      </div>
    );
  }
  return (
    <header className={`${classes.header}`}>
      <nav className={`container ${classes.nav}`}>
        <div className="always-flex">
          {isMobile && (
            <div className="mt-0">
              <Link href={"/"} className="normalise-btn">
                <RxHamburgerMenu size={20} />
              </Link>
            </div>
          )}
          <div className={`${classes.imgContainer}`}>
            <Link href={"/"} className="normalise-btn">
              <Image
                src={"/images/logos/logo-no-background.svg"}
                alt={"#"}
                fill
                priority
              />
            </Link>
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

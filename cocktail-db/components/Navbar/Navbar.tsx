import React from "react";
import style from "./nav.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

const Navbar: React.FunctionComponent = () => {
  const router = useRouter();
  const { route } = router;

  return (
    <>
      <nav className={style.nav}>
        <div className={style.nav__logo}>
          <Image
            src="https://react-projects-15-cocktails.netlify.app/static/media/logo.9a3d2645.svg"
            alt="#"
            priority
            width={200}
            height={80}
          />
        </div>
        <ul className={style.nav__ul}>
          <li>
            <Link
              href="/"
              className={clsx({ [style.activepage]: route === "/" })}
            >
              Home
            </Link>{" "}
          </li>
          <li>
            <Link
              href="/about"
              className={clsx({ [style.activepage]: route === "/about" })}
            >
              About
            </Link>{" "}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;

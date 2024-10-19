import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="header">
      <nav className="nav-bar">
        <h2 className="logo">NextJs</h2>
        <ul className="menu">
          <li className="menu-item">
            <Link href="/">Home</Link>
          </li>
          <li className="menu-item">
            <Link href="/posts">Posts</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

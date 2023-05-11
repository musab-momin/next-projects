import React, { memo } from "react";
import classes from "./mainlayout.module.css";
import Head from "next/head";
import Navbar from "@/components/Navbar/Navbar";

type props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: props) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="description" content="Demo Project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <main className="container">{children}</main>
    </>
  );
};

export default memo(MainLayout);

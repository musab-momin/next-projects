import React from "react";
import classes from "./pagelayout.module.css";

type PageLayoutProps = {
  children: React.ReactNode[];
};

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.flexLeft}>{children && children[0]}</div>
        <div className={classes.flexRight}>{children && children[1]}</div>
      </div>
    </div>
  );
};

export default PageLayout;

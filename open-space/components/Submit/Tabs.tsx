import React from "react";
import classes from "./submit.module.css";

type TabsProps = {
  title: string;
  icon: JSX.Element;
  activeTab: string;
  changeActiveTab: (tabTitle: string) => void;
};

const Tabs: React.FC<TabsProps> = ({
  activeTab,
  title,
  icon,
  changeActiveTab,
}) => {
  return (
    <button
      type="button"
      className={`${classes.tabs__window} ${
        title === activeTab ? classes.tabs__windowActive : ""
      }`}
      onClick={() => changeActiveTab(title)}
    >
      {icon}
      <span>{title}</span>
    </button>
  );
};

export default Tabs;

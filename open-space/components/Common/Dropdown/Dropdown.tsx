import React, { useEffect, useRef, useState } from "react";
import classes from "./dropdown.module.css";
import { RiArrowDropDownLine } from "react-icons/ri";

type DropdownProps = {
  parentIcon: JSX.Element;
  children: JSX.Element;
  centre?: boolean;
};

const Dropdown: React.FC<DropdownProps> = ({
  parentIcon,
  children,
  centre = false,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkOutsideClick = (eve: any) => {
      if (open && ref.current && !ref.current.contains(eve.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", checkOutsideClick);

    return () => {
      document.removeEventListener("click", checkOutsideClick);
    };
  }, [open]);

  return (
    <div className={classes.container} ref={ref}>
      <div className="always-flex" onClick={() => setOpen((prev) => !prev)}>
        {parentIcon}
        <RiArrowDropDownLine />
      </div>
      <div
        className={`${classes.dropItem} ${open ? classes.openModal : ""} ${
          centre ? classes.dropItemCentre : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;

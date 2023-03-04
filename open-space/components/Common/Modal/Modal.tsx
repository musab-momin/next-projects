import React from "react";
import classes from "./modal.module.css";
import { AiOutlineClose } from "react-icons/ai";

type modalProps = {
  title: string;
  onClose: () => void;
  isOpen: boolean;
  children: JSX.Element;
};

const Modal: React.FC<modalProps> = ({ children, title, isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className={classes.cover}>
          <div className={classes.modal}>
            <div className={classes.modal__head}>
              <h2 className={classes.modal__title}>{title}</h2>
              <button className="normalise-btn" onClick={onClose}>
                <AiOutlineClose
                  className={classes.modal__btn}
                  onClick={onClose}
                  size={20}
                />
              </button>
            </div>
            <div className={classes.modal__body}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

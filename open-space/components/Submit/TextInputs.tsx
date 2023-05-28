import React from "react";
import classes from "./submit.module.css";

type TextInputsProps = {
  handleChange: (
    eve: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  inputValue: string;
};

const TextInputs: React.FC<TextInputsProps> = ({
  handleChange,
  inputValue,
}) => {
  return (
    <>
      <textarea
        name="body"
        placeholder="Text (optional)"
        className={classes.titlebar__txtArea}
        rows={8}
        cols={25}
        value={inputValue}
        onChange={handleChange}
      />
    </>
  );
};

export default TextInputs;

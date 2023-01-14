import React from "react";
import style from "./searchbar.module.css";

type searchbarProps = {
  searchTxt: string;
  onSearchTxtChange: (eve: React.ChangeEvent<HTMLInputElement>) => void;
};

const Searchbar = ({ searchTxt, onSearchTxtChange }: searchbarProps) => {
  return (
    <div className={style.frm}>
      <h2 className={style.frm__heading}>Search Your Faviourte Coctail</h2>
      <input
        type="text"
        className={style.frm__inp}
        value={searchTxt}
        onChange={onSearchTxtChange}
      />
    </div>
  );
};

export default Searchbar;

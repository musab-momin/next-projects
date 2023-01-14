import React from "react";
import style from "./singlecocktail.module.css";
import Image from "next/image";
import Link from "next/link";

type singleCocktailProps = {
  drinks: any[];
};

const SingleCocktail = ({ drinks }: singleCocktailProps) => {
  if (!drinks) {
    return <h2>Drinks not found, search something else</h2>;
  }

  return (
    <div className={style.container}>
      {drinks.map((drink: any) => (
        <div className={style.card} key={drink.idDrink}>
          <div className={style.card__head}>
            <Image src={drink.strDrinkThumb} alt="#" priority fill />
          </div>
          <div className={style.card__body}>
            <h2 className={style.card__title}>{drink.strDrink}</h2>
            <h5 className={style.card__subTitle}>{drink.strGlass}</h5>
            <p className={style.card__desc}>{drink.strAlcoholic}</p>
            <div className={style.card__footer}>
              <Link
                href={`/cocktail/${drink.idDrink}`}
                className={style.card__btn}
              >
                DETAILS
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SingleCocktail;

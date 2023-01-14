import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import style from "./iddrink.module.css";
import Image from "next/image";
import { fectchSingleCocktails } from "@/mist/UtilsFunctions";

type cocktailType = {
  name: string;
  image: string;
  isAlcoholic: string;
  category: string;
  glass: string;
  instructions: string;
};

const CocktailInfo = ({ drinks }: any) => {
  const [cocktailDetails, setCocktailDetails] = useState<null | cocktailType>(
    null
  );

  useEffect(() => {
    const filterDrinks = () => {
      const {
        strDrink: name,
        strDrinkThumb: image,
        strAlcoholic: isAlcoholic,
        strCategory: category,
        strGlass: glass,
        strInstructions: instructions,
      } = drinks[0];
      const filterCocktail = {
        name,
        image,
        isAlcoholic,
        category,
        glass,
        instructions,
      };
      setCocktailDetails(filterCocktail);
    };
    drinks.length > 0 && filterDrinks();
  }, [drinks]);

  return (
    <Layout>
      <section>
        {cocktailDetails ? (
          <div className={style.container}>
            <div className={style.container__img}>
              <Image src={cocktailDetails.image} alt="#" fill priority />
            </div>
            <div className={style.container__info}>
              <div className={style.container__row}>
                <p className={style.container__title}>Name: </p>{" "}
                <p>{cocktailDetails.name}</p>
              </div>
              <div className={style.container__row}>
                <p className={style.container__title}>Category: </p>
                <p>{cocktailDetails.isAlcoholic}</p>
              </div>
              <div className={style.container__row}>
                <p className={style.container__title}>Info: </p>
                <p>{cocktailDetails.category}</p>
              </div>
              <div className={style.container__row}>
                <p className={style.container__title}>Instruction: </p>{" "}
                <p>{cocktailDetails.instructions}</p>
              </div>
              <div className={style.container__row}>
                <p className={style.container__title}>Ingredients: </p>{" "}
                <p>{cocktailDetails.glass}</p>
              </div>
            </div>
          </div>
        ) : (
          <h2>Invalid URL</h2>
        )}
      </section>
    </Layout>
  );
};

export async function getServerSideProps(context: any) {
  const {
    query: { idDrink },
  } = context;
  const { drinks } = await fectchSingleCocktails(idDrink);

  return {
    props: {
      drinks,
    },
  };
}

export default CocktailInfo;

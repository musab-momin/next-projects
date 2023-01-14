import Layout from "@/components/Layout";
import Searchbar from "@/components/Searchbar";
import React, { useEffect, useState } from "react";
import SingleCocktail from "@/components/SingleCocktail";
import { fectchCocktails } from "@/mist/UtilsFunctions";
import { useDebaunce } from "@/mist/CustomHooks";

export async function getStaticProps() {
  const { drinks } = await fectchCocktails();
  return {
    props: {
      drinks,
    },
  };
}

export default function Home({ drinks }: any) {
  const [searchTxt, setSearchTxt] = useState("");
  const [drinksData, setDrinksData] = useState(drinks);
  const [laoding, setLoading] = useState(false);

  const onSearchTxtChange = (eve: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTxt(eve.target.value);
  };

  const optimiseSearchTxt = useDebaunce(searchTxt, 300);

  useEffect(() => {
    const callApi = async () => {
      setLoading(true);
      try {
        const { drinks } = await fectchCocktails(optimiseSearchTxt);
        setDrinksData(drinks);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    optimiseSearchTxt && callApi();
  }, [optimiseSearchTxt]);

  return (
    <>
      <Layout>
        <Searchbar
          searchTxt={searchTxt}
          onSearchTxtChange={onSearchTxtChange}
        />
        <section className="cocktail-section">
          {laoding ? (
            <h2>Loading...</h2>
          ) : (
            <SingleCocktail drinks={drinksData} />
          )}
        </section>
      </Layout>
    </>
  );
}

const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const IDURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

export const fectchCocktails = async (query = "a") => {
  const response = await fetch(`${URL}${query}`);
  return await response.json();
};

export const fectchSingleCocktails = async (drinkId) => {
  try {
    const response = await fetch(`${IDURL}${drinkId}`);
    return await response.json();
  } catch (error) {
    const drinks = [];
    return { drinks };
  }
};

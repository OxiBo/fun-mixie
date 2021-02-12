export const selectSingleCocktail = ({ cocktails }) => cocktails.singleCocktail;

export const selectSingleCocktailError = ({ cocktails }) =>
  cocktails.singleCocktailError;

const page = 5;
export const selectCocktailsList = ({ cocktails }) => {
  // console.log(page)
  return cocktails.cocktailsList;
};
export const selectCocktailsListError = ({ cocktails }) =>
  cocktails.cocktailsSearchError;

export const selectIngredient = ({ cocktails }) => {
  return cocktails.ingredient;
};

export const selectIngredientError = ({ cocktails }) =>
  cocktails.ingredientError;

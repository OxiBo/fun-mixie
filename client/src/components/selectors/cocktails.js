export const selectSingleCocktail = ({ cocktails }) => cocktails.singleCocktail;

export const selectSingleCocktailError = ({ cocktails }) =>
  cocktails.singleCocktailError;

export const selectCocktailsList = ({ cocktails }) => {
  // console.log(page)
  return cocktails.cocktailsList;
};
export const selectCocktailsListError = ({ cocktails }) =>
  cocktails.cocktailsSearchError;

export const selectFaveCocktails = ({ cocktails }) => {
  return cocktails.faveCocktails;
};
export const selectFaveCocktailsError = ({ cocktails }) =>
  cocktails.faveCocktailsError;

export const selectIngredient = ({ cocktails }) => {
  // console.log(cocktails)
  return cocktails.ingredient;
};

export const selectIngredientError = ({ cocktails }) =>
  cocktails.ingredientError;

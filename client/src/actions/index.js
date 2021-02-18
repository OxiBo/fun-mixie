import axios from "axios";
import cocktaildb from "../apis/cocktailsAPI";
import {
  parseCocktailInfo,
  getCocktailsNames,
} from "../utils/parseCocktailRecipe";
import {
  FETCH_USER,
  AUTH_ERROR,
  SEARCH_COCKTAILS,
  CLEAR_COCKTAILS_LIST,
  SEARCH_SINGLE_COCKTAIL,
  SEARCH_INGREDIENT,
  SEARCH_INGREDIENT_ERROR,
  CLEAR_INGREDIENT,
  SINGLE_COCKTAIL_ERROR,
  COCKTAILS_SEARCH_ERROR,
  POPULATE_AUTOCOMPLETE,
  AUTOCOMPLETE_EMPTY,
  FETCH_FAVE_COCKTAILS,
  FETCH_FAVE_COCKTAILS_ERROR,
} from "./types";

export const fetchUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/user");
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (err) {
    console.error(err);
    dispatch({ type: AUTH_ERROR, payload: err.message });
  }
};

export const searchRandomCocktail = () => async (dispatch) => {
  try {
    const res = await cocktaildb.get("/random.php");
    const cocktailDetails = parseCocktailInfo(res.data.drinks[0]);
    dispatch({ type: SEARCH_SINGLE_COCKTAIL, payload: cocktailDetails });
  } catch (err) {
    console.log(err);
    dispatch({ type: SINGLE_COCKTAIL_ERROR, payload: err.message });
  }
};

export const searchIngredient = (name) => async (dispatch) => {
  try {
    const res = await cocktaildb.get(`/search.php?i=${name}`);

    const {
      idIngredient,
      strIngredient,
      strDescription,
      strType,
      strAlcohol,
    } = res.data.ingredients[0];
    const ingredient = {
      id: idIngredient,
      name: strIngredient,
      description: strDescription,
      type: strType,
      alcohol: strAlcohol,
    };

    dispatch({ type: SEARCH_INGREDIENT, payload: ingredient });
  } catch (err) {
    console.log(err);
    dispatch({ type: SEARCH_INGREDIENT_ERROR, payload: err.message });
  }
};

export const clearIngredient = () => {
  return { type: CLEAR_INGREDIENT };
};

export const clearCocktailsList = () => {
  return { type: CLEAR_COCKTAILS_LIST };
};

export const searchSingleCocktail = (id, noSearch) => async (
  dispatch,
  getState
) => {
  let cocktailDetails;
  try {
    if (noSearch) {
      // cocktailDetails = await getState.cocktails.singleCocktail;
      // console.log(cocktailDetails);
      cocktailDetails = getState().cocktails.cocktailsList.find(
        (item) => item.id === id
      );
    } else {
      const res = await cocktaildb.get(`/lookup.php?i=${id}`);
      cocktailDetails = parseCocktailInfo(res.data.drinks[0]);
    }

    dispatch({ type: SEARCH_SINGLE_COCKTAIL, payload: cocktailDetails });
  } catch (err) {
    console.log(err);
    dispatch({ type: SINGLE_COCKTAIL_ERROR, payload: err.message });
  }
};

export const searchCocktails = (
  query,
  searchBy = "name",
  autocomplete = false
) => async (dispatch) => {
  let res, cocktailsList, typeAhead;

  try {
    // if (!query) {
    //   res = await cocktaildb.get("/random.php");
    //   const cocktailDetails = parseCocktailInfo(res.data.drinks[0]);
    //   dispatch({ type: SEARCH_SINGLE_COCKTAIL, payload: cocktailDetails });
    // } else
    if (searchBy === "name") {
      res = await cocktaildb.get(`/search.php?s=${query}`);
      if (res.data.drinks) {
        if (autocomplete) {
          typeAhead = res.data.drinks.map((item) => getCocktailsNames(item));
          dispatch({ type: POPULATE_AUTOCOMPLETE, payload: typeAhead });
        } else {
          cocktailsList = res.data.drinks.map((item) =>
            parseCocktailInfo(item)
          );
          dispatch({ type: SEARCH_COCKTAILS, payload: cocktailsList });
        }
      } else if (!res.data.drinks && autocomplete) {
        dispatch({ type: AUTOCOMPLETE_EMPTY });
      } else {
        dispatch({ type: COCKTAILS_SEARCH_ERROR, payload: "No drinks found" });
      }
    } else if (searchBy === "ingredient") {
      res = await cocktaildb.get(`/filter.php?i=${query}`);

      if (res.data.drinks) {
        if (autocomplete) {
          typeAhead = res.data.drinks.map((item) => getCocktailsNames(item));
          dispatch({ type: POPULATE_AUTOCOMPLETE, payload: typeAhead });
        } else {
          cocktailsList = res.data.drinks.map(
            ({ idDrink, strDrink, strDrinkThumb }) => {
              return { id: idDrink, name: strDrink, image: strDrinkThumb };
            }
          );
          dispatch({ type: SEARCH_COCKTAILS, payload: cocktailsList });
        }
      } else if (!res.data.drinks && autocomplete) {
        dispatch({ type: AUTOCOMPLETE_EMPTY });
      } else {
        dispatch({ type: COCKTAILS_SEARCH_ERROR, payload: "No drinks found" });
      }
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: COCKTAILS_SEARCH_ERROR, payload: err.message });
  }
};

export const likeCocktail = (apiId, data) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/like/`, { apiId, data });
    dispatch({ type: FETCH_USER, payload: res.data });
    // console.log(res.data)
  } catch (err) {
    console.log(err);
  }
};

export const fetchFavoriteCocktails = (
  currentPage,
  perPageFaveCocktails
) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/api/user-cocktails/?page=${currentPage}&size=${perPageFaveCocktails}`
    );
    const { total, paginated } = data;
    dispatch({ type: FETCH_FAVE_COCKTAILS, payload: { total, paginated } });
  } catch (err) {
    console.log(err);
    dispatch({ type: FETCH_FAVE_COCKTAILS_ERROR, payload: err.message });
  }
};

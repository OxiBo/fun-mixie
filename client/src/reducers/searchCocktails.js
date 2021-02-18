import {
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
} from "../actions/types";

const defaultAuthState = {
  singleCocktail: null,
  singleCocktailError: false,
  cocktailsList: [],
  cocktailsSearchError: false,
  faveCocktails: [],
  faveCocktailsError: false,
  typeAhead: [],
  typeAheadEmpty: false,
  ingredient: {},
  ingredientError: false,
};

const cocktailsReducer = (state = defaultAuthState, action) => {
  switch (action.type) {
    case SEARCH_SINGLE_COCKTAIL:
      return {
        ...state,
        singleCocktailError: false,
        singleCocktail: action.payload || null,
      };
    case SINGLE_COCKTAIL_ERROR:
      return {
        ...state,
        singleCocktail: null,
        singleCocktailError: action.payload,
      };
    case SEARCH_COCKTAILS:
      return {
        ...state,
        cocktailsSearchError: false,
        cocktailsList: action.payload || [], // ???
      };
    case COCKTAILS_SEARCH_ERROR:
      return {
        ...state,
        cocktailsSearchError: action.payload,
        // ????
      };
    case FETCH_FAVE_COCKTAILS:
      return {
        ...state,
        faveCocktailsError: false,
        faveCocktails: action.payload || [], // ???
      };
    case FETCH_FAVE_COCKTAILS_ERROR:
      return {
        ...state,
        faveCocktailsError: action.payload,
        // ????
      };
    case CLEAR_COCKTAILS_LIST:
      return {
        ...state,
        cocktailsList: [],
        cocktailsSearchError: false,
      };
    case SEARCH_INGREDIENT:
      return {
        ...state,
        ingredientError: false,
        ingredient: action.payload || null,
      };
    case SEARCH_INGREDIENT_ERROR:
      return {
        ...state,
        ingredient: {},
        ingredientError: action.payload,
      };
    case CLEAR_INGREDIENT:
      return {
        ...state,
        ingredient: {},
        ingredientError: false,
      };
    case POPULATE_AUTOCOMPLETE:
      return {
        ...state,
        typeAhead: action.payload,
        typeAheadEmpty: false,
      };
    case AUTOCOMPLETE_EMPTY:
      return { ...state, typeAheadEmpty: true };
    default: {
      return state;
    }
  }
};

export default cocktailsReducer;

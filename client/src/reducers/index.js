import { combineReducers } from "redux";

import auth from "./auth";
import cocktails from "./searchCocktails";

export default combineReducers({
  auth,
  cocktails,
});

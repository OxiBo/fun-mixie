import { combineReducers } from "redux";

import auth from "./auth";
import cocktails from "./searchCocktails";
import posts from "./posts";

export default combineReducers({
  auth,
  cocktails,
  posts
});

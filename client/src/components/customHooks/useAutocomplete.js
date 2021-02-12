import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "./useDebounce";
import { searchCocktails } from "../../actions";

const useAutocomplete = (query, searchBy) => {
  const dispatch = useDispatch();

  const debouncedQuery = useDebounce(query, 500); //https://stackoverflow.com/questions/54666401/how-to-use-throttle-or-debounce-with-react-hook

  const by = useRef("name");
  // to avoid warning about searchBy not being added to dependency list
  useEffect(() => {
    if (by.current !== searchBy) {
      by.current = searchBy;
    }
  }, [searchBy]);

  const searchSuggestions = useSelector((state) => state.cocktails.typeAhead);
  const ifIncludesQuery = query
    ? searchSuggestions
        .map((item) => item.toLowerCase())
        .includes(query.toLowerCase())
    : true;
  useEffect(() => {
    // search for cocktail names if there is a query and it is not in the previously shown suggestions
    if (debouncedQuery && !ifIncludesQuery) {
      dispatch(searchCocktails(debouncedQuery, by.current, true));
    }
  }, [debouncedQuery, dispatch, ifIncludesQuery]);

  return searchSuggestions;
};

export default useAutocomplete;

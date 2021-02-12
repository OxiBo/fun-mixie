import React, { useState, useEffect } from "react";

import SearchCocktailsContext from "./contexts/SearchCocktailsContext";
import useAutocomplete from "./customHooks/useAutocomplete";

import SearchCocktailsForm from "./SearchCocktailsForm";
import SearchFormOptions from "./SearchFormOptions";
import SearchSuggestionsBox from "./SearchSuggestionsBox";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [suggestionsBoxOpen, setSuggestionsBoxOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchSuggestions = useAutocomplete(query, searchBy);

  // https://stackoverflow.com/questions/62366824/how-can-%C4%B1-pass-function-with-state-for-react-usecontext
  const contextValues = {
    query,
    setQuery,
    searchBy,
    setSearchBy,
    optionsOpen,
    setOptionsOpen,
    suggestionsBoxOpen,
    setSuggestionsBoxOpen,
    suggestions,
    setSuggestions,
  };

  //   const debouncedQuery = useDebounce(query, 5000); //https://stackoverflow.com/questions/54666401/how-to-use-throttle-or-debounce-with-react-hook

  useEffect(() => {
    setSuggestions(searchSuggestions.slice(0, 10));
    // console.log(suggestions)
    if (searchSuggestions.length >= 1) setSuggestionsBoxOpen(true);
  }, [searchSuggestions]);

  return (
    <div className="header__search">
      <SearchCocktailsContext.Provider value={contextValues}>
        <SearchCocktailsForm />
        <SearchFormOptions />
        <SearchSuggestionsBox />
      </SearchCocktailsContext.Provider>
    </div>
  );
};

export default Search;

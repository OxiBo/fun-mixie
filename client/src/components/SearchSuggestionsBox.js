import React, { useRef, useContext } from "react";

import useOutsideClick from "./customHooks/useOutsideClick";
import SearchCocktailsContext from "./contexts/SearchCocktailsContext";

const SearchSuggestionsBox = () => {
  const {
    suggestions,
    setSuggestions,
    setQuery,
    suggestionsBoxOpen,
    setSuggestionsBoxOpen,
  } = useContext(SearchCocktailsContext);

  // detect outside click for autocomplete box
  const suggestionsBoxRef = useRef();
  useOutsideClick(suggestionsBoxRef, () => {
    if (suggestionsBoxOpen) setSuggestionsBoxOpen(false);
  });
  return (
    <div
      ref={suggestionsBoxRef}
      className={`header__search-2 ${suggestionsBoxOpen ? "slideIn" : ""} `}
    >
      <div className="slideIn-search-box">
        <div className="slideIn-search-box-body  slideIn-search-box-body-suggestions">
          <ul className="slideIn-search-box-body-suggestions-list">
            {suggestions.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="slideIn-search-box-body-suggestions-list-item"
                onClick={async () => {
                  await setQuery(item);
                  await setSuggestions([]);
                  setSuggestionsBoxOpen(false);
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestionsBox;

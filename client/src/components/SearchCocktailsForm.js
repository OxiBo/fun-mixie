import React, { useRef, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchCocktails } from "../actions";
import useOutsideClick from "./customHooks/useOutsideClick";
import SearchCocktailsContext from "./contexts/SearchCocktailsContext";
import sprite from "../styles/img/sprite.svg";

const SearchCocktailsForm = () => {
  const {
    query,
    setQuery,
    searchBy,
    optionsOpen,
    setOptionsOpen,
    setSuggestions,
    setSuggestionsBoxOpen,
  } = useContext(SearchCocktailsContext);

  const history = useHistory();
  const [submitError, setSubmitError] = useState(false);

  const dispatch = useDispatch();
  // detect outside click for search options section
  const ref = useRef();
  useOutsideClick(ref, () => {
    if (optionsOpen) setOptionsOpen(false);
  });
  return (
    <div className="header__search-1">
      <form
        className="search-form"
        onSubmit={async (e) => {
          e.preventDefault();
          await setOptionsOpen(false);
          if (query.trim()) {
            await dispatch(searchCocktails(query, searchBy));
            await setQuery("");
            await setSuggestions([]); //???
            setSubmitError(false);
          } else {
            setSubmitError(true);
          }
          history.push("/");
        }}
      >
        <input
          type="text"
          className={`search-form__input ${
            submitError ? "emptyFieldError" : ""
          }`}
          placeholder={`Search cocktails by ${searchBy}`}
          value={query}
          onChange={async (e) => {
            await setQuery(e.target.value);

            if (e.target.value.trim()) {
              setSubmitError(false);
            } else {
              // close suggestion box if there is no query
              setSuggestionsBoxOpen(false);
            }
          }}
        />

        <button className="search-form__button">
          <svg className="search-form__icon">
            {/* <use href={sprite + "#icon-magnifying-glass"} /> */}
            <use href={sprite + "#icon-search"} />
          </svg>
        </button>
      </form>
      <button
        className="header__search-1-options btn-options"
        onClick={() => setOptionsOpen(!optionsOpen)}
      >
        <svg className="icon  icon-options">
          <use href={sprite + "#icon-equalizer"} />
        </svg>
        <span className="header__search-1-options-float-span">
          <p>Search options</p>
        </span>
      </button>
    </div>
  );
};

export default SearchCocktailsForm;

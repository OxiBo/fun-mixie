import React, { useRef, useContext } from "react";

import useOutsideClick from "./customHooks/useOutsideClick";
import SearchCocktailsContext from "./contexts/SearchCocktailsContext";

const SearchOptionsForm = () => {
  const { optionsOpen, setOptionsOpen, searchBy, setSearchBy } = useContext(
    SearchCocktailsContext
  );
  // detect outside click for search options section
  const ref = useRef();
  useOutsideClick(ref, () => {
    if (optionsOpen) setOptionsOpen(false);
  });

  return (
    <div
      ref={ref}
      className={`header__search-2 ${optionsOpen ? "slideIn" : ""} `}
    >
      {/* form with radio buttons in react - https://stackoverflow.com/questions/58094441/correct-way-of-using-usestate-hook-on-radio-buttons */}
      <form
        className="slideIn-search-box"
        onSubmit={async (e) => {
          e.preventDefault();
        }}
      >
        <div className="slideIn-search-box-body">
          <div className="slideIn-search-box-description">
            <p>Search by: </p>
          </div>
          <div className="slideIn-search-box-radio">
            <input
              className="slideIn-search-box-input"
              type="radio"
              id="cocktail-name"
              name="searchBy"
              value="name"
              onChange={() => setSearchBy("name")}
              checked={searchBy === "name"}
            />
            <label className="slideIn-search-box-label" htmlFor="cocktail-name">
              <span className="slideIn-search-box-button"></span>Name
            </label>
          </div>

          <div className="slideIn-search-box-radio">
            <input
              className="slideIn-search-box-input"
              type="radio"
              id="ingredient"
              name="searchBy"
              value="ingredient"
              onChange={() => setSearchBy("ingredient")}
              checked={searchBy === "ingredient"}
            />
            <label className="slideIn-search-box-label" htmlFor="ingredient">
              <span className="slideIn-search-box-button"></span>Ingredient
            </label>
          </div>
        </div>
      </form>
      <span className="extra-space"></span>
    </div>
  );
};

export default SearchOptionsForm;

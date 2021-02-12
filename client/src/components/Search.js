import React, { useState, useEffect, useRef } from "react";

import { connect } from "react-redux";

import { searchCocktails } from "../actions";
import useOutsideClick from "./customHooks/useOutsideClick";

// svg icons
import sprite from "../styles/img/sprite.svg";

const Search = ({ searchCocktails }) => {
  const [query, setCocktail] = useState("");
  const [submitError, setSubmitError] = useState(false);
  const [searchBy, setSearchBy] = useState("name");
  const [optionsOpen, setOptionsOpen] = useState(false);

  // detect outside click for search options section
  const ref = useRef();
  useOutsideClick(ref, () => {
    if (optionsOpen) setOptionsOpen(false);
  });

  useEffect(() => {
    searchCocktails();
  }, [searchCocktails]);
  return (
    <div className="header__search">
      <div className="header__search-1">
        <form
          action="#"
          className="search-form"
          onSubmit={async (e) => {
            e.preventDefault();
            await setOptionsOpen(false);
            if (query.trim()) {
              await searchCocktails(query, searchBy);
              setCocktail("");
              setSubmitError(false);
            } else {
              setSubmitError(true);
            }
          }}
        >
          <input
            type="text"
            className={`search-form__input ${
              submitError ? "emptyFieldError" : ""
            }`}
            placeholder={`Search cocktails by ${searchBy}`}
            value={query}
            onChange={(e) => {
              setCocktail(e.target.value);
              if (e.target.value.trim()) {
                setSubmitError(false);
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
      <div
        ref={ref}
        className={`header__search-2 ${optionsOpen ? "slideIn" : ""} `}
      >
        {/* form with radio buttons in react - https://stackoverflow.com/questions/58094441/correct-way-of-using-usestate-hook-on-radio-buttons */}
        <form
          className="two-options-form"
          onSubmit={async (e) => {
            e.preventDefault();
          }}
        >
          <div className="two-options-form-body">
            <div className="two-options-form-description">
              <p>Search by: </p>
            </div>
            <div className="two-options-form-radio">
              <input
                className="two-options-form-input"
                type="radio"
                id="cocktail-name"
                name="searchBy"
                value="name"
                onChange={() => setSearchBy("name")}
                checked={searchBy === "name"}
              />
              <label className="two-options-form-label" htmlFor="cocktail-name">
                <span className="two-options-form-button"></span>Name
              </label>
            </div>

            <div className="two-options-form-radio">
              <input
                className="two-options-form-input"
                type="radio"
                id="ingredient"
                name="searchBy"
                value="ingredient"
                onChange={() => setSearchBy("ingredient")}
                checked={searchBy === "ingredient"}
              />
              <label className="two-options-form-label" htmlFor="ingredient">
                <span className="two-options-form-button"></span>Ingredient
              </label>
            </div>
          </div>
        </form>
        <span className="extra-space"></span>
      </div>
    </div>
  );
};

export default connect(null, { searchCocktails })(Search);

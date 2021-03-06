import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// svg icons
import sprite from "../styles/img/sprite.svg";
import Spinner from "./Spinner";
import EmailForm from "./EmailForm";
import Liked from "./Liked";
import { searchIngredient } from "../actions";
import {
  selectSingleCocktail,
  selectSingleCocktailError,
} from "./selectors/cocktails";

import useFetchData from "./customHooks/useFetchData";

const SingleCocktail = () => {
  
  const { data, error, loading } = useFetchData(
    selectSingleCocktail,
    selectSingleCocktailError
  );

  const dispatch = useDispatch();
  // const user = useSelector(({ auth }) => auth.user);

  const renderCocktailInfo = () => {
    const {
      apiId,
      name,
      alcoholic,
      instructions,
      ingredients,
      glass,
      image,
    } = data;
    return (
      <>
        <figure className="cocktail__details-figure">
          <img
            className="cocktail__details-figure-image"
            src={image}
            alt="cocktail in glass"
          />
          <figcaption className="cocktail__details-figure-caption">
            <span className="cocktail__details-figure-name">{name} </span>
          </figcaption>
          <div className="cocktail__details-figure-alcoholic">
            {alcoholic ? (
              <svg className="cocktail__details-figure-alcoholic-icon icon icon-drink">
                <use href={sprite + "#icon-drink1"} />
              </svg>
            ) : (
              <svg className="cocktail__details-figure-alcoholic-icon icon icon-drink">
                <use href={sprite + "#icon-drink"} />
              </svg>
            )}
            <p className="cocktail__details-figure-alcoholic-text">
              {alcoholic ? "Alcoholic" : "Non-Alcoholic"}
            </p>
          </div>
          <div className="cocktail__details-figure-liked">
            {" "}
            <Liked apiId={apiId} data={data} />
          </div>
        </figure>

        <div className="cocktail__details-figure-ingredients">
          <h3 className="cocktail__details-figure-ingredients-heading heading-tertiary">
            Ingredients
          </h3>
          <ul className="cocktail__details-figure-ingredients-list">
            {ingredients.map((item) => (
              <li
                key={`${item.measure}-${item.ingredient}`}
                className="cocktail__details-figure-ingredients-item"
              >
                <svg className="cocktail__details-figure-ingredients-item-icon icon icon-checkmark">
                  <use href={sprite + "#icon-checkmark"} />
                </svg>

                <p>
                  {" "}
                  {item.measure}
                  <span
                    onClick={() =>
                      dispatch(searchIngredient(item.ingredient || item))
                    }
                    className="cocktail__details-figure-ingredients-item-ingredient"
                  >
                    {" "}
                    {item.ingredient || item}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="cocktail__details-figure-directions">
          <h3 className="cocktail__details-figure-directions-heading heading-tertiary">
            How to make it
          </h3>
          <div className="cocktail__details-figure-directions">
            <p className="cocktail__details-figure-directions-text">
              {instructions}
            </p>
          </div>
        </div>
        <div className="cocktail__details-figure-bottom">
          <div className="cocktail__details-figure-bottom-serve">
            <svg className="cocktail__details-figure-bottom-icon icon-serve icon icon-arrow">
              <use href={sprite + "#icon-redo2"} />
            </svg>
            <p className="cocktail__details-figure-bottom-serve-text">
              Serve in{" "}
              <span className="cocktail__details-figure-bottom-serve-text-glass">
                {glass}
              </span>
            </p>
          </div>
           <EmailForm cocktail={data}/>
        </div>
      </>
    );
  };

  return (
    <div className="cocktail__details">
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="cocktail__details-error error">
          <p className="error-message">{error}</p>
        </div>
      ) : (
        data && renderCocktailInfo()
      )}
    </div>
  );
};

export default SingleCocktail;

import React from "react";
import { useHistory } from "react-router-dom";
import sprite from "../styles/img/sprite.svg";
import Liked from "./Liked";

const FaveCocktailItem = ({ cocktail: { name, alcoholic, image, apiId } }) => {
  const history = useHistory();
  return (
    <li className="fave-cocktails-list-item">
      <figure className="fave-cocktails-list-item-figure">
        <img
          className="fave-cocktails-list-item-image"
          src={image}
          alt="cocktail"
        />
      </figure>
      <p className="fave-cocktails-list-item-alcoholic">
        {alcoholic ? (
          <svg className="fave-cocktails-list-item-alcoholic-icon icon icon-drink">
            <use href={sprite + "#icon-drink1"} />
          </svg>
        ) : (
          <svg className="fave-cocktails-list-item-alcoholic-icon icon icon-drink">
            <use href={sprite + "#icon-drink"} />
          </svg>
        )}

        {alcoholic ? "Alcoholic" : "Non-Alcoholic"}
      </p>
      <button
        onClick={() => {
          history.push(`/?api=${apiId}`);
        }}
        className="fave-cocktails-list-item-name"
      >
        {name}
      </button>
      <div className="fave-cocktails-list-item-liked">
        <Liked apiId={apiId} />
      </div>
    </li>
  );
};

export default FaveCocktailItem;

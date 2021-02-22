import React from "react";
import { useDispatch } from "react-redux";

import { searchSingleCocktail } from "../actions";

const CocktailItem = ({ cocktail: { apiId, image, name, ingredients } }) => {
  // console.log(props)
  const dispatch = useDispatch();
 
  return (
    <li className="cocktails__list-item" data-cocktail-id={apiId}>
      <button
        className="cocktails__list-item-link"
        onClick={() => dispatch(searchSingleCocktail(apiId, ingredients && true))}
      >
        <img
          className="cocktails__list-item-image"
          src={image}
          alt="cocktail in glass"
        />
        <p className="cocktails__list-item-name">{name}</p>
      </button>
    </li>
  );
};

export default CocktailItem;

import React from "react";
// TODO get rid of render prop User and fetch user info from redux store


import { useDispatch } from "react-redux";

import User from "./renderProps/User";
import { likeCocktail } from "../actions";
import sprite from "../styles/img/sprite.svg";

const Liked = ({ apiId, data }) => {
  const dispatch = useDispatch();
  return (
    <User>
      {({ user, error }) => {
        if (error) return <p>{error}</p>; // ??

        // svg gradient - https://fvsch.com/svg-gradient-fill
        if (user) {
          const liked =
            user.cocktails.findIndex((cocktail) => cocktail.apiId === apiId) < 0
              ? false
              : true;
          return (
            <div
              onClick={() => dispatch(likeCocktail(apiId, liked || data))}
              className="liked"
            >
              <svg className="liked-item-icon icon icon-heart icon-heart-full">
                <use href={sprite + "#icon-heart1"} />
                <linearGradient id="heart-full-gradient" x2="1" y2="1">
                  <stop
                    offset="0%"
                    className={`${liked ? "from-light" : "from-white"}`}
                  />
                  <stop
                    offset="100%"
                    className={`${liked ? "to-dark" : "to-grey"}`}
                  />
                </linearGradient>
              </svg>
            </div>
          );
        }
      }}
    </User>
  );
};

export default Liked;

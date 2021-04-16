import React, { useState, useRef, useEffect } from "react";


// svg icons
import sprite from "../styles/img/sprite.svg";
import Spinner from "./Spinner";

import { selectIngredient, selectIngredientError } from "./selectors/cocktails";
import { clearIngredient } from "../actions";
import useFetchData from "./customHooks/useFetchData";
import ButtonClear from "./ButtonClear";

const IngredientInfo = () => {
 
  const [popup, setPopupOpen] = useState(false);
  const ref = useRef();

  const { data, error, loading } = useFetchData(
    selectIngredient,
    selectIngredientError
  );

  const onPopupBackgroundClick = (e) => {
    if (e.target === ref.current) {
      setPopupOpen(false);
    }
  };

  useEffect(() => {
   console.log(data)
  }, [data])
  const renderIngredientInfo = () => {
    const { id, alcohol, description, name, type } = data;
    return (
      <>
        <div className="ingredient__info-heading">
          <a href="/#" onClick={() => setPopupOpen(true)}>
            <img
              className="ingredient__info-heading-image"
              src={`https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`}
              alt={`${name} picture`}
            />
          </a>

          <div
            ref={ref}
            className={`ingredient__info-heading-popup ${popup ? "open" : ""}`}
            onClick={onPopupBackgroundClick}
          >
            <div className="ingredient__info-heading-popup-foreground">
              <div
                className="ingredient__info-heading-popup-foreground-button"
                onClick={() => setPopupOpen(false)}
              >
                <svg className="ingredient__info-heading-popup-foreground-button-icon icon icon-cancel">
                  <use href={sprite + "#icon-cancel"} />
                </svg>
              </div>
              <img
                className="ingredient__info-heading-popup-image-big"
                src={`https://www.thecocktaildb.com/images/ingredients/${name}.png`}
                alt={`${name} picture`}
              />
            </div>
          </div>

          <div className="ingredient__info-heading-name">
            <h3 className="ingredient__info-heading-name heading-4">{name}</h3>
            <div className="ingredient__info-heading-alcoholic">
              {alcohol && alcohol.toLowerCase() === "yes" ? (
                <svg className="ingredient__info-heading-alcoholic-icon icon icon-drink">
                  <use href={sprite + "#icon-drink1"} />
                </svg>
              ) : (
                <svg className="ingredient__info-heading-alcoholic-icon icon icon-drink">
                  <use href={sprite + "#icon-drink"} />
                </svg>
              )}
              <p className="ingredient__info-heading-alcoholic-text">
                {alcohol && alcohol.toLowerCase() === "yes"
                  ? "Alcoholic"
                  : "Non-alcoholic"}
              </p>
            </div>
          </div>
        </div>

        {/* <h3 className="ingredient__info-heading heading-4">{name}</h3> */}
        <div className="ingredient__info-details">
          {/* <div className="ingredient__info-details-alcoholic">
            {alcohol && alcohol.toLowerCase() === "yes" ? (
              <svg className="ingredient__info-details-alcoholic-icon icon icon-drink">
                <use href={sprite + "#icon-drink1"} />
              </svg>
            ) : (
              <svg className="ingredient__info-details-alcoholic-icon icon icon-drink">
                <use href={sprite + "#icon-drink"} />
              </svg>
            )}
            <p className="ingredient__info-details-alcoholic-text">
              {alcohol ? "Alcoholic" : "Non-alcoholic"}
            </p>
          </div> */}

          <div className="ingredient__info-details-description">
            {/* {" "}
            <img
              className="ingredient__info-details-description-image"
              src={`https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`}
              alt={`${name} picture`}
            />{" "} */}
            <p className="ingredient__info-details-description-text">
              {description}
            </p>
          </div>
        </div>
     
        <ButtonClear action={clearIngredient} />
      </>
    );
  };

  return (
    <div className="ingredient__info">
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="ingredient__info-error error">
          <p className="error-message">{error}</p>
        </div>
      ) : data && Object.entries(data).length ? (
        renderIngredientInfo()
      ) : (
        false
      )}
    </div>
  );
};

export default IngredientInfo;
/*
Object.entries(data).length ? renderIngredientInfo() : <h4 className="ingredient__info-heading heading-4">No ingredients chosen</h4> */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emailCocktail } from "../actions";
import sprite from "../styles/img/sprite.svg";
const EmailForm = ({ cocktail }) => {
    
  const [formShow, setFormShow] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  return (
    <>
      {user && (
        <div className="cocktail__details-figure-bottom-email">
          <div className="cocktail__details-figure-bottom-envelope">
            <svg className="cocktail__details-figure-bottom-icon icon-email icon icon-envelop">
              <use href={sprite + "#icon-envelop"} />
            </svg>{" "}
          </div>
          <form
            action=""
            className="cocktail__details-figure-bottom-form-checkbox"
          >
            <input
              type="text"
              id="email"
              type="checkbox"
              onChange={() => {
                setEmailError(null);
                setEmail("");
                setFormShow(!formShow);
              }}
              className="cocktail__details-figure-bottom-form-check"
              checked={formShow}
            />
            <label
              htmlFor="email"
              className={`cocktail__details-figure-bottom-form-label ${
                formShow ? "label-hide" : ""
              }`}
            >
              Email it
            </label>
          </form>
          <form
            action=""
            className={`cocktail__details-figure-bottom-form-email ${
              formShow ? "email-show" : ""
            }`}
            onSubmit={(e) => {
              e.preventDefault();
              if (!emailError) {
                 
                dispatch(emailCocktail(cocktail, email));
                setEmail("");
                setFormShow(!formShow);
              }
            }}
          >
            <input
              type="text"
              className="cocktail__details-figure-bottom-form-email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
                  setEmailError("Invalid email address");
                } else {
                  setEmailError(null);
                }
              }}
            />
            {emailError && (
              <p className="cocktail__details-figure-bottom-form-email-error">
                {emailError}
              </p>
            )}
            <button className="cocktail__details-figure-bottom-form-email-submit">
              Email it
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EmailForm;

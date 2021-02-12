import React from "react";
import { Link } from "react-router-dom";
// svg
import sprite from "../styles/img/sprite.svg";

// renderProp
import User from "./renderProps/User";

// components


const Navigation = () => {
  return (
    <User>
      {({ user, error }) => {
        return (
          <nav className="header__nav-bar">
            <ul className="nav-bar__list">
              <li className="nav-bar__list-item">
                <Link to="" className="nav-bar__list-link">
                  Inspire
                </Link>
              </li>
              {user && (
                <li className="nav-bar__list-item">
                  <a href="#" className="nav-bar__list-link">
                    New Post
                  </a>
                </li>
              )}
              <li className="nav-bar__list-item">
                <Link to="" className="nav-bar__list-link">
                  Fav
                </Link>
              </li>
              {user ? (
                <li className="nav-bar__list-item">
                  <a href="/api/logout" className="nav-bar__list-link">
                    <svg className="nav-bar__list-icon icon-exit">
                      <use href={sprite + "#icon-exit"}></use>
                    </svg>
                    Sign out
                  </a>
                </li>
              ) : (
                <li className="nav-bar__list-item">
                  <Link to="/signin" className="nav-bar__list-link">
                    <svg className="nav-bar__list-icon icon-signin">
                      <use href={sprite + "#icon-enter"}></use>
                    </svg>{" "}
                    Sign in
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        );
      }}
    </User>
  );
};

export default Navigation;

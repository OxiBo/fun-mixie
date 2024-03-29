import React from 'react';
import { Link } from 'react-router-dom';
// svg
import sprite from '../styles/img/sprite.svg';

// renderProp
import User from './renderProps/User';

// components

const Navigation = () => {
  return (
    <User>
      {({ user, error }) => {
        {
          /* console.log(user); */
        }
        return (
          <nav className="header__nav-bar">
            <ul className="nav-bar__list">
              <li className="nav-bar__list-item">
                <Link to="/posts" className="nav-bar__list-link">
                  <svg className="nav-bar__list-icon icon-book">
                    <use href={sprite + '#icon-book2'}></use>
                  </svg>{' '}
                  <span>blog</span>
                </Link>
              </li>
              {user ? (
                <>
                  <li className="nav-bar__list-item">
                    <Link to="/posts/new" className="nav-bar__list-link">
                      <svg className="nav-bar__list-icon icon-pencil">
                        <use href={sprite + '#icon-pencil'}></use>
                      </svg>
                     <span>create</span> 
                    </Link>
                  </li>

                  <li className="nav-bar__list-item">
                    <Link to={`/my-cocktails`} className="nav-bar__list-link">
                      <svg className="nav-bar__list-icon icon-heart-full">
                        <use href={sprite + '#icon-heart1'}></use>
                      </svg>
                      <span>faves</span>
                    </Link>
                  </li>

                  <li className="nav-bar__list-item">
                    <a href="/api/logout" className="nav-bar__list-link">
                      <svg className="nav-bar__list-icon icon-exit">
                        <use href={sprite + '#icon-exit'}></use>
                      </svg>
                      <span>out</span>
                    </a>
                  </li>
                </>
              ) : (
                <li className="nav-bar__list-item">
                  <Link to="/signin" className="nav-bar__list-link">
                    <svg className="nav-bar__list-icon icon-signin">
                      <use href={sprite + '#icon-enter'}></use>
                    </svg>{' '}
                    <span>Sign in</span>
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

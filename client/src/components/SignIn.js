import React, { useRef } from 'react';
import { useHistory, Link, Redirect } from 'react-router-dom';
import User from './renderProps/User';
import sprite from '../styles/img/sprite.svg';
const SignIn = () => {
  const history = useHistory();

  return (
    <User>
      {({ user, authError }) => {
        console.log(authError);
        if (authError) return <div>Auth error</div>;
        if (user) return <Redirect to="/" />;
        return (
          <div className="signin">
            <div className="signin__container u-margin-top-bottom-big">
              <div className="signin__header">
                <h1 className="heading-primary">
                  Welcome to
                  <span className="heading-primary__brand">Fun-mixie</span>
                </h1>
              </div>
              <h3 className="heading-tertiary">
                Find tons of delicious cocktails recipes
              </h3>
              <div className="signin-buttons">
                <a
                  href="/auth/facebook"
                  className="btn btn-big btn-social signin-buttons__social btn-facebook"
                >
                  <svg className="icon icon-facebook">
                    <use href={sprite + '#icon-facebook1'}></use>
                  </svg>
                  Continue with Facebook
                </a>
                <a
                  href=""
                  className="btn btn-big btn-social signin-buttons__social btn-instagram"
                >
                  <svg className="icon icon-instagram">
                    <use href={sprite + '#icon-instagram-with-circle'}></use>
                  </svg>
                  Continue with Instagram
                </a>
                <a
                  href="/auth/twitter"
                  className="btn btn-big btn-social signin-buttons__social btn-twitter"
                >
                  <svg className="icon icon-twitter">
                    <use href={sprite + '#icon-twitter1'}></use>
                  </svg>
                  Continue with Twitter
                </a>
                <Link to="/" className="btn btn-big btn-danger signin-buttons__cancel">
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        );
      }}
    </User>
  );
};

export default SignIn;

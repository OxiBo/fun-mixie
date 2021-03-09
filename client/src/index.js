import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// redux, react-redux
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

// reducer
import reducer from "./reducers";

// components

import TestPage from "./components/TestPage";

import App from "./components/App";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import BlogList from "./components/BlogList";
import FavoriteCocktails from "./components/FavoriteCocktails";
import NewPost from "./components/NewPost";
import NotFoundPage from "./components/NotFoundPage";


// styles
import "./index.scss";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    {" "}
    <Provider store={store}>
      <BrowserRouter>
          <App>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/my-cocktails" component={FavoriteCocktails} />
            <Route exact path="/blog" component={BlogList} />
            <Route exact path="/test" component={TestPage} />
            <Route exact path="/posts/new" component={NewPost} />
            {/* https://stackoverflow.com/questions/51457480/react-router-4-catch-all-route */}
            <Route component={NotFoundPage} />
        </Switch>
          </App>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

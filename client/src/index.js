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
import App from "./components/App";
import Home from "./components/Home";
import SignIn from "./components/SignIn";


// styles
import "./index.scss";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    {" "}
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <App>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={SignIn} />
          
          </App>
        </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

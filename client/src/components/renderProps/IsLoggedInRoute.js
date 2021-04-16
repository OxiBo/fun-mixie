import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../selectors/auth";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  console.log(Component);
  console.log(rest);
  const { user, authError } = useSelector(selectUser);
  console.log(user);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...rest} {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default ProtectedRoute;

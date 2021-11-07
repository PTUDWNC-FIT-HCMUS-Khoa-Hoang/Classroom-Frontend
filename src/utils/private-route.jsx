import React from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const { user, token } = rest;
  return (
    <Route
      {...rest}
      render={(props) =>
        authed ? (
          <Component {...props} currentUser={user} token={token} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;

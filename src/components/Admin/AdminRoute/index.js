import React from "react";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, isAdmin, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAdmin ? (
        <Component {...rest} {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);

export default AdminRoute;

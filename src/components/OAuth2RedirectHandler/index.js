import React from "react";
import { ACCESS_TOKEN } from "../../constants";
import { Redirect, useHistory, useLocation } from "react-router-dom";

const OAuth2RedirectHandler = () => {
  const history = useHistory();
  const location = useLocation();

  const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

    var results = regex.exec(location.search);
    console.log('check google: ', results);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  const token = getUrlParameter("token");
  const error = getUrlParameter("error");

  if (token) {
    localStorage.setItem(ACCESS_TOKEN, token);

    history.push("/home");
    window.location.reload();
  } else {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: {
            from: location.pathname,
            error: error,
          },
        }}
      />
    );
  }
};

export default OAuth2RedirectHandler;

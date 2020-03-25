import React from "react";
import { Route, Redirect } from "react-router-dom";

export const AuthRoute = props => {
  // We rename the component variable to Component because,
  // we want to make it clear that component is a user defined
  // react component. and is named with PascalCase, same
  // as all user defined react components
  const { isAuthenticated, component: Component, ...routeProps } = props;
  // Wen destructuring from an object, we can rename property
  // names of the object using the ":"

  // routeProps is going to be an object with properties
  // provided by <Route /> component from react-router
  // such as: history, exact, location, etc...

  // if isAuthenticated is false...
  if (!isAuthenticated) {
    // redirect to sign in page
    return <Redirect to="/sign_in" />;
  } else {
    // otherwise, allow users to correctly navigate to the page
    // they want. This is done by rendering the Route component
    // and passing it all of the props that it needs
    return <Route {...routeProps} component={Component} />;
  }
};

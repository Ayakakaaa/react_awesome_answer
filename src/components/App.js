import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import QuestionShowPage from "./pages/QuestionShowPage";
import { QuestionIndexPage } from "./pages/QuestionIndexPage";
import { WelcomePage } from "./pages/WelcomePage";
import { NavBar } from "./NavBar";
import { QuestionNewPage } from "./pages/QuestionNewPage";
import { SignInPage } from "./pages/SignInPage";
import { User } from "../api/user";
import { Session } from "../api/session";
import { AuthRoute } from "./AuthRoute";
import { SignUpPage } from "./pages/SignUpPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { QuestionEditPage } from "./pages/QuestionEditPage";
import { UserEditPage } from "./pages/UserEditPage";


const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showTime] = useState(true);

  const getUser = useCallback(() => {
    User.current().then(data => {
      if (typeof data.id !== "number") {
        setCurrentUser(null);
      } else {
        setCurrentUser(data);
      }
    });
  }, []);

  const destroySession = () => {
    Session.destroy().then(setCurrentUser(null));
  };

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <BrowserRouter>
      <header>
        <NavBar
          currentUser={currentUser}
          onSignOut={destroySession}
          showTime={showTime}
        />
      </header>
      <div className="ui container segment">
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route exact path="/questions" component={QuestionIndexPage} />
          <AuthRoute
            // The !! turns a statement from "truthy/falsy" to "true/false" respectively
            isAuthenticated={!!currentUser}
            component={QuestionNewPage}
            path="/questions/new"
            exact
          />
          <AuthRoute
            path="/questions/:id/edit"
            isAuthenticated={!!currentUser}
            component={QuestionEditPage}
          />
          <AuthRoute
            isAuthenticated={!!currentUser}
            component={QuestionShowPage}
            path="/questions/:id"
            exact
          />
          <AuthRoute
            isAuthenticated={!!currentUser}
            path="/users/:id/edit"
            render={routeProps => (
              <UserEditPage
                {...routeProps}
                onUserUpdate={getUser}
                currentUser={currentUser}
              />
            )}
          />      
          <Route
            path="/sign_up"
            render={routeProps => (
              <SignUpPage {...routeProps} onSignUp={getUser} />
            )}
          />
          <Route
            path="/sign_in"
            render={routeProps => (
              <SignInPage {...routeProps} onSignIn={getUser} />
            )}
          />
          {/* 
          A <Route /> component without a "path" prop will render 
          for all routes. This is primarily inside of a <Switch>
        */}
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;

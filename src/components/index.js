import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./auth/login";
import SignUp from "./auth/signup";
import Sidebar from "./builder/Sidebar";
import Users from "./users";
import Vendors from "./vendors";

function Application() {
  return (
    <Router>
      <div>
        <Switch>
          <React.Fragment>
            <Route path="/auth/app/Login" component={Login} />
            <Route path="/auth/app/Signup" component={SignUp} />
            <div className="flex-container">
              <Route  path="/app">
                <div className="sidenav">
                  <Sidebar />
                </div>
              </Route>
              <div className="main__content">
                <Route path="/app/manage-users" component={Users} />
                <Route path="/app/manage-vendors" component={Vendors} />
              </div>
            </div>
          </React.Fragment>
        </Switch>
      </div>
    </Router>
  );
}

export default Application;

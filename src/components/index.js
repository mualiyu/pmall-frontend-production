import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./auth/login";
import NewPasswordPage from "./auth/newPasswordPage";
import ResetPassword from "./auth/passwordReset";
import SignUp from "./auth/signup";
import Sidebar from "./builder/Sidebar";
import Users from "./users";
import Vendors from "./vendors";
import Store from "./store";

function Application() {
  return (
    <Router>
      <div>
        <Switch>
          <React.Fragment>
            {/* <Route path="/app/Login" component={Login} /> */}
            <Route path="/auth/app/Login" component={Login} />
            <Route path="/auth/app/Signup" component={SignUp} />
            <Route path="/auth/app/Reset-password" component={ResetPassword} />
            <Route path="/auth/app/Set-new-password" component={NewPasswordPage} />
            <div className="flex-container">
              <div className="sidenav">
                <Sidebar />
              </div>
              <div className="main__content">
                <Route path="/app/manage-users" component={Users} />
                <Route path="/app/manage-vendors" component={Vendors} />
                <Route path="/" component={Store} />
              </div>
            </div>
          </React.Fragment>
        </Switch>
      </div>
    </Router>
  );
}

export default Application;

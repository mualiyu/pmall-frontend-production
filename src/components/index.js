import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Affilates from "./affilates";
import Login from "./auth/login";
import NewPasswordPage from "./auth/newPasswordPage";
import ResetPassword from "./auth/passwordReset";
import SignUp from "./auth/signup";
import Sidebar from "./builder/Sidebar";
import Dashboard from "./dashboard";
import OrderManagement from "./orderManagement";
import ProductList from "./productList";
import Users from "./users";
import Vendors from "./vendors";
import VendorDetails from "./vendors/details";
import AffilateDetails from "./affilates/details";
import ProductDetails from "./singleProductDetails";

function Application() {
  return (
    <Router>
      <div>
        <Switch>
          <React.Fragment>
            <Route path="/auth/app/Login" component={Login} />
            <Route path="/auth/app/Signup" component={SignUp} />
            <Route path="/auth/app/Reset-password" component={ResetPassword} />
            <Route path="/auth/app/Set-new-password" component={NewPasswordPage} />
            <div className="flex-container">
              <Route  path="/app">
                <div className="sidenav">
                  <Sidebar />
                </div>
              </Route>
              <div className="main__content">
                <Route path="/app/users/list" component={Users} />
                <Route path="/app/vendors/list" component={Vendors} />
                <Route path="/app/vendors/details" component={VendorDetails} />
                <Route path="/app/affilates/list" component={Affilates} />
                <Route path="/app/affilates/details" component={AffilateDetails} />
                <Route path="/app/product/list" component={ProductList} />
                <Route path="/app/product/detail" component={ProductDetails} />
                <Route path="/app/dashboard" component={Dashboard} />
                <Route path="/app/order-management" component={OrderManagement} />
              </div>
            </div>
          </React.Fragment>
        </Switch>
      </div>
    </Router>
  );
}

export default Application;

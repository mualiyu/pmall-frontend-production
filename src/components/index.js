import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Affilates from "./affilates";
import Login from "./auth/login";
import NewPasswordPage from "./auth/newPasswordPage";
import ResetPassword from "./auth/passwordReset";
import SignUp from "./auth/signup";
import Sidebar from "./builder/Sidebar";
import Products from "./products";
import Users from "./users";
import Vendors from "./vendors";
import Store from "./store";
import OrderManagement from "./orderManagement";
import VendorDetails from "./vendors/details";
import ProductDetails from "./products/details";
import AffilateDetails from "./affilates/details";
import Dashboard from "./dashboard";
import UserDetails from "./users/details";
import ProductList from "./productList";
import Categories from "./categories";

function Application() {
  return (
    <Router>
      <React.Fragment>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/auth/app/Signup" element={<SignUp />} />
            <Route
              path="/auth/app/Reset-password"
              element={<ResetPassword />}
            />
            <Route
              path="/auth/app/Set-new-password"
              element={<NewPasswordPage />}
            />
          </Routes>
          <div className="flex-container">
            {/* <Routes>
              <Route
                path="/app"
                element={
                  <div className="sidenav">
                    <Sidebar />
                  </div>
                }
              /> */}

            {/* <Route path="/app"> */}
            <div className="sidenav">
              <Sidebar />
              <Routes>
                <Route path="/" element={<Store />} />
              </Routes>
            </div>
            {/* </Route> */}
            {/* </Routes> */}
            <div className="main__content">
              <Routes>
                <Route path="/app/dashboard" element={<Dashboard />} />
                <Route path="/app/users" element={<Users />} />
                <Route path="/app/users/details" element={<UserDetails />} />
                <Route path="/app/vendors" element={<Vendors />} />

                <Route
                  path="/app/order-management"
                  element={<OrderManagement />}
                />
                <Route
                  path="/app/vendors/details"
                  element={<VendorDetails />}
                />
                <Route
                  path="/app/products/details"
                  element={<ProductDetails />}
                />
                <Route
                  path="/app/products/list"
                  element={<ProductList />}
                />
                <Route path="/app/affilates" element={<Affilates />} />
                <Route
                  path="/app/affilates/details"
                  element={<AffilateDetails />}
                />
                <Route path="/app/products" element={<Products />} />
                <Route path="/app/categories" element={<Categories/>} />
              </Routes>
            </div>
          </div>
          {/* </Routes> */}
        </div>
      </React.Fragment>
    </Router>
  );
}

export default Application;

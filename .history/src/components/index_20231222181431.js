import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Affilates from "./affilates";
import Login from "./auth/login";
import NewPasswordPage from "./auth/newPasswordPage";
import ResetPassword from "./auth/passwordReset";
import SignUp from "./auth/signup";
import Sidebar from "./builder/Sidebar";
import ProductList from "./productList";
import Users from "./users";
import Vendors from "./vendors";
import Dashboard from "./dashboard";

function Application() {
  return (
    <Router>
      <React.Fragment>
        <div>
          <Routes>
            <Route path="/auth/app/Login" element={<Login />} />
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
            </div>
            {/* </Route> */}
            {/* </Routes> */}
            <div className="main__content">
              <Routes>
                <Route path="/app/dashboard" element={<Dashboard />} />
                <Route path="/app/users/list" element={<Users />} />
                <Route path="/app/vendors/list" element={<Vendors />} />
                <Route path="/app/affilates/list" element={<Affilates />} />
                <Route path="/app/product/list" element={<ProductList />} />
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

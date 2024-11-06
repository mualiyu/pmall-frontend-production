import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import Gallery from "./gallery";
import OrderDetails from "./orderManagement/details";
import SiteSettings from "./siteSettings";
import VerifyToken from "./auth/verifyToken";
import { useUser } from "../context/UserContext";
import StoreFront from "./storefront";
import Cart from "./cart";
import CheckoutPage from "./checkout";
import TransactionHistory from "./transactionhistory";

// Component to normalize path casing
function CaseInsensitiveWrapper() {
  const location = useLocation();
  const navigate = useNavigate();

const toKebabCase = (str) => {
  return str
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/_/g, '-')   // Replace underscores with hyphens
    .toLowerCase();       // Convert to lowercase
};


  useEffect(() => {
    const normalizedPath = location.pathname
      .split('/')
      .map(segment => segment.toLowerCase().replace(/ /g, '-')) // Replace spaces with hyphens
      .join('/');

    if (location.pathname !== normalizedPath) {
      navigate(normalizedPath, { replace: true });
    }
  }, [location, navigate]);

  return null;
}

function Application() {
  const { user } = useUser();
  const isLoggedIn = Boolean(localStorage.getItem("authToken"));

  return (
    <Router>
      <CaseInsensitiveWrapper />
      <div className="app-container">
        {/* {!isLoggedIn && ( */}
          <Routes>
            <Route path="/" element={<StoreFront />} />
            <Route path="/auth/sign-in" element={<Login />} />
            <Route path="/auth/app/signup" element={<SignUp />} />
            <Route path="/auth/app/reset-account" element={<ResetPassword />} />
            <Route path="/auth/app/reset/" element={<NewPasswordPage />} />
            <Route path="/auth/app/verify/:email" element={<VerifyToken />} />
            {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
          </Routes>

        {/* {isLoggedIn && ( */}
          <>
            <div className="flex-container">
              <Sidebar className="sidenav" />
              <div className="main__content">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/app/users" element={<Users />} />
                  <Route path="/app/users/details" element={<UserDetails />} />
                  <Route path="/app/vendors" element={<Vendors />} />
                  <Route path="/app/order-management" element={<OrderManagement />} />
                  <Route path="/app/vendors/details" element={<VendorDetails />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/app/cart" element={<Cart />} />
                  <Route path="/app/checkout" element={<CheckoutPage />} />
                  <Route path="/app/transaction-history" element={<TransactionHistory />} />
                  <Route path="/app/products/list" element={<ProductList />} />
                  <Route path="/app/affilates" element={<Affilates />} />
                  <Route path="/app/affilates/details" element={<AffilateDetails />} />
                  <Route path="/app/products" element={<Products />} />
                  <Route path="/app/categories" element={<Categories />} />
                  <Route path="/app/gallery" element={<Gallery />} />
                  <Route path="/app/order/details" element={<OrderDetails />} />
                  <Route path="/app/settings" element={<SiteSettings />} />
                </Routes>
              </div>
            </div>
          </>
        
      </div>
    </Router>
  );
}

export default Application;

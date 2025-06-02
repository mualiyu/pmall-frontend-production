import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Affilates from "./affilates";
import Login from "./auth/login";
import NewPasswordPage from "./auth/newPasswordPage";
import useNetworkStatus from '../hooks/useNetworkStatus';
import ResetPassword from "./auth/passwordReset";
import SignUp from "./auth/signup";
import Sidebar from "./builder/Sidebar";
import MobileNav from "./builder/MobileNav";
import Products from "./products";
import Users from "./users";
import Vendors from "./vendors";
import Header from "./builder/Header";
import Footer from "./builder/Footer";
import OrderManagement from "./orderManagement";
import LeadershipRank from "./documentation/leadershipRank";
import VendorDetails from "./vendors/details";
import ProductDetails from "./products/details";
import AdvertMaker from "./advert";
import AffilateDetails from "./affilates/details";
// import MyNetwork from "./affilates/myNetwork";
import Dashboard from "./dashboard";
import UserDetails from "./users/details";
import MyNetwork from "./users/MyNetwork";
import Messaging from "./messaging";
import NetworkDetails from "./users/networkDetails";
import ProductList from "./productList";
import Categories from "./categories";
import Gallery from "./gallery";
import VendorStore from ".vendor/store";
import CategoryProducts from "./productList/categoryProducts";
import PackageList from "./packages";
import OrderDetails from "./orderManagement/details";
import SiteSettings from "./siteSettings";
import VerifyToken from "./auth/verifyToken";
import TransactionOrderHistory from "./transactions";
import { useUser } from "../context/UserContext";
import StoreFront from "./storefront";
import Cart from "./cart";
import CheckoutPage from "./checkout";
import TransactionHistory from "./transactionhistory";
import TransactionPurchase from "./transactionPurchase";

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

function Layout() {
  const location = useLocation();
  const isOnline = useNetworkStatus();
  const isAuthPath = location.pathname.includes("/auth");
  const isLoggedInPath = location.pathname.includes("/app");

  const showHeaderAndFooter = !(isAuthPath || isLoggedInPath);

  return (
    <div className="app-container">
      <div style={{
        backgroundColor: isOnline ? '#d4edda' : '#f8d7da',
        color: isOnline ? '#155724' : '#721c24',
        padding: '10px',
        textAlign: 'center',
        fontWeight: 'bold',
        position: 'fixed',
        zIndex: 9999,
        right: 0,
        bottom: 0,
      }}>
        {isOnline ? 'You are online ✅' : 'You are offline ❌'}
      </div>

      {showHeaderAndFooter && <Header />}

      <Routes>
        {/* StoreFront and public-facing routes (accessible to everyone) */}
        <Route path="/" element={<StoreFront />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/category/:id" element={<CategoryProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/transaction/verify" element={<TransactionPurchase />} />
      </Routes>

      {isAuthPath && (
        <Routes>
          {/* Authentication Routes */}
          <Route path="/auth/sign-in" element={<Login />} />
          <Route path="/auth/app/signup" element={<SignUp />} />
          <Route path="/auth/app/reset-account" element={<ResetPassword />} />
          <Route path="/auth/app/reset/" element={<NewPasswordPage />} />
          <Route path="/auth/app/verify/:email" element={<VerifyToken />} />
        </Routes>
      )}

      {isLoggedInPath && !isAuthPath && (
        <div className="flex-container">
          <Sidebar className="sidenav" />
          <MobileNav />
          <div className="main__content">
            <Routes>
              {/* Protected App Routes */}
              <Route path="/app/dashboard" element={<Dashboard />} />
              <Route path="/app/users" element={<Users />} />
              <Route path="/app/users/details" element={<UserDetails />} />
              <Route path="/app/vendors" element={<Vendors />} />
              <Route path="/app/order-management" element={<OrderManagement />} />
              <Route path="/app/vendors/details" element={<VendorDetails />} />
              <Route path="/app/transaction-history" element={<TransactionHistory />} />
              <Route path="/app/products/list" element={<ProductList />} />
              <Route path="/app/leadership-rank" element={<LeadershipRank />} />
              <Route path="/app/messaging" element={<Messaging />} />
              <Route path="/app/affilates" element={<Affilates />} />
              <Route path="/app/transaction/history" element={<TransactionOrderHistory />} />
              <Route path="/app/affilates/details" element={<AffilateDetails />} />
              <Route path="/app/network/genealogy/" element={<MyNetwork />} />
              <Route path="/app/account/packages" element={<PackageList />} />
              <Route path="/app/products" element={<Products />} />
              <Route path="/app/categories" element={<Categories />} />
              <Route path="/app/store-management" element={<Gallery />} />
              <Route path="/app/vendor/store" element={<VendorStore />} />
              <Route path="/app/advert_maker" element={<AdvertMaker />} />
              <Route path="/app/order/details" element={<OrderDetails />} />
              <Route path="/app/network/details" element={<NetworkDetails />} />
              <Route path="/app/settings" element={<SiteSettings />} />
            </Routes>
          </div>
        </div>
      )}

      {showHeaderAndFooter && <Footer />}
    </div>
  );
}


function Application() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default Application;

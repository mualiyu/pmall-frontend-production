import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarRow from "./SidebarRow";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import EmailIcon from "@mui/icons-material/Email";
import GroupsIcon from "@mui/icons-material/Groups";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HubIcon from "@mui/icons-material/Hub";
import Person2Icon from "@mui/icons-material/Person2";
import ReduceCapacityIcon from "@mui/icons-material/ReduceCapacity";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useUser, useLogOut } from "../../context/UserContext";
import "./Builder.css";
import { useVendor } from "../../context/VendorSignupContext";
function MobileNav() {
  const { user, setUser } = useUser();
  const {
    visible,
    setVisible,
  } = useVendor();
  
  const logOut = useLogOut();
  const navigate = useNavigate();
  console.log(user);
  console.log(localStorage.getItem("authToken"));
  const getInitials = (name) => {
    if (name) {
      let arr = name?.split("");
      return arr[0];
    }
    return false;
  };
  
  return (
    // {}
    <>
      {user?.token && (
        <section className="mobile__nav flex show-mobile">
        {user?.accountType === "Affiliate" && (
          <div>
            <SidebarRow path="/app/dashboard" Icon={StorefrontIcon} title="Dashboard" />
            <SidebarRow path="/app/vendors" Icon={GroupsIcon} title="Vendors" />
            <SidebarRow path="/app/affilates" Icon={HubIcon} title="Affiliates" />
            <SidebarRow path="/app/messaging" Icon={EmailIcon} title="Message" />
            <SidebarRow path="/app/network/genealogy" Icon={ReduceCapacityIcon} title="Genealogy" />
            <SidebarRow path="/app/users/details" Icon={Person2Icon} title="Profile" />
          </div>
        )}
  
        {user?.accountType === "Vendor" && (
          <div>
            <SidebarRow path="/app/dashboard" Icon={StorefrontIcon} title="Dashboard" />
            <SidebarRow path="/app/store-management" Icon={ShoppingBasketIcon} title="Market" />
            <SidebarRow path="/app/products" Icon={ShoppingCartIcon} title="Products" />
            <SidebarRow path="/app/messaging" Icon={EmailIcon} title="Message" />
            <SidebarRow path="/app/order-management" Icon={CreditCardIcon} title="Orders" />
            <SidebarRow path="/app/users/details" Icon={Person2Icon} title="Profile" />
          </div>
        )}
  
        {user?.accountType !== "Vendor" &&
          user?.accountType !== "Affiliate" &&
          user?.accountType !== "Admin" && (
            <div>
              <SidebarRow path="/app/dashboard" Icon={StorefrontIcon} title="Dashboard" />
              <SidebarRow path="/" Icon={ShoppingCartIcon} title="Market Place" />
              <SidebarRow path="/app/transaction/history" Icon={CreditCardIcon} title="My Orders" />
              <SidebarRow path="/app/messaging" Icon={EmailIcon} title="Message/Support" />
            </div>
          )}
      </section>
      )}
    </>
  );
}

export default MobileNav;

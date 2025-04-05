import React from "react";
import { useNavigate } from "react-router-dom";
import SidebarRow from "./SidebarRow";
import SpeedIcon from "@material-ui/icons/Speed";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import GroupsIcon from "@mui/icons-material/Groups";
import EuroIcon from '@mui/icons-material/Euro';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MoneyIcon from '@mui/icons-material/Money';
import FlagIcon from '@mui/icons-material/Flag';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import FortIcon from '@mui/icons-material/Fort';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Groups2Icon from '@mui/icons-material/Groups2';
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EmailIcon from "@mui/icons-material/Email";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import BuildIcon from "@mui/icons-material/Build";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Person2Icon from '@mui/icons-material/Person2';
import HubIcon from "@mui/icons-material/Hub";
import { useUser, useLogOut } from "../../context/UserContext";
import logo from "../../assets/imgs/pmall_logo_200.png";
import "./Builder.css";

function Sidebar() {
  const { user, setUser } = useUser();
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
        <div className="sidebar no-print">
          <div className="logo__holder">
            <img src={logo} alt="Pmall" style={{ width: 130 }} />
            {/* <h3> Logo </h3> */}
          </div>
{/* <h3 className="ml-20p" style={{fontSize: 11, color: '#ffb31f'}}> Administrators </h3> */}
          <div className="s-divider"></div>
          
          <SidebarRow
            path="/app/dashboard"
            Icon={SpeedIcon}
            title="Dashboard"
          />
          <SidebarRow
                path=""
                Icon={ShoppingBasketIcon}
                title="Market Place"
              />
           <SidebarRow
                path=""
                Icon={EuroIcon}
                title="Wallet"
              />
          {(user?.accountType === "Vendor" ||
            user?.accountType === "Admin") && (
            <>
              <SidebarRow
                path="/app/store"
                Icon={AddBusinessIcon}
                title="Store Management"
              />
              <SidebarRow
                path="/app/order-management"
                Icon={ShoppingCartIcon}
                title="Order Management"
              />
              
               <SidebarRow
                path="/app/users/details/"
                Icon={Person2Icon}
                title="My Profile"
              />
               <SidebarRow
            path="/app/users"
            Icon={FlutterDashIcon}
            title="Store Manager"
          />
            </>
          )}
          {(user?.accountType === "Admin" ||
            user?.accountType === "Affiliate") && (
              <>
            <SidebarRow
              path="/app/vendors"
              Icon={GroupsIcon}
              title="Vendor Resources"
            />
            <SidebarRow
            path="/app/users/details"
            Icon={Person2Icon}
            title="My Account Proflle"
          />
          </>
          )}
         

          <div className="s-divider"></div>
          {/* <SidebarRow path="/app/front-desk"  Icon={HomeWorkIcon} title="Front Desk"/> */}
          {(user?.accountType === "Affiliate" ||
            user?.accountType === "Admin") && (
              <>
            <SidebarRow
              path="/app/affilates"
              Icon={HubIcon}
              title="Affiliate Management"
            />
            {/* <SidebarRow
                path="/app/network/genealogy/"
                Icon={Groups2Icon}
                title="My Network"
              /> */}
              <SidebarRow
                path="/app/account/packages"
                Icon={CardGiftcardIcon}
                title="Account Packages"
              />
              <SidebarRow
                path="/app/network/genealogy/"
                Icon={ReduceCapacityIcon}
                title="Geneology"
              />
              <SidebarRow
                path="/app/leadership-rank"
                Icon={FortIcon}
                title="Leadership Rank"
              />
              <SidebarRow
                path=""
                Icon={DisplaySettingsIcon}
                title="Marketing"
              />
              <SidebarRow
                path=""
                Icon={MoneyIcon}
                title="Sales"
              />
           
              
              <SidebarRow
                path=""
                Icon={ShoppingCartIcon}
                title="Transaction Reports"
              />
              </>
          )}
          {(user?.accountType === "Vendor" ||
            user?.accountType === "Admin") && (
              <>
            <SidebarRow
              path="/app/products"
              Icon={ShoppingCartIcon}
              title="Product Management"
            />
           {/* <SidebarRow
                path=""
                Icon={ShoppingCartIcon}
                title="My Store"
              /> */}
           <SidebarRow
                path=""
                Icon={CardGiftcardIcon}
                title="Promotions"
              />
              
              <SidebarRow
                path=""
                Icon={LocalOfferIcon}
                title="Coupons"
              />
              
              <SidebarRow
                path=""
                Icon={LocalShippingIcon}
                title="Locate a Stockiest"
              />
              <SidebarRow
                path=""
                Icon={ShoppingBasketIcon}
                title="Market Place"
              />
              </>
          )}
          {(user?.accountType === "Stockiest" ||
            user?.accountType === "Admin") && (
            <SidebarRow
              path="/app"
              Icon={DirectionsCarIcon}
              title="Dispatch Management"
            />
          )}
          <SidebarRow path="/app/messaging" Icon={EmailIcon} title="Messaging/Support" />

          <SidebarRow
            path="/app"
            Icon={CreditCardIcon}
            title="Transaction Records"
          />
          {user?.accountType === "Admin" && (
            <>
            {/* <SidebarRow
              path="/app"
              Icon={AssignmentIcon}
              title="User Account"
            /> */}
            <SidebarRow
              path="/app"
              Icon={AssignmentIcon}
              title="PMall Reports"
            />
            <SidebarRow
              path="/app/advert_maker"
              Icon={FlagIcon}
              title="Advert Maker"
            />
            </>
          )}
          <SidebarRow
            Icon={PowerSettingsNewIcon}
            title="Log Out"
            onClick={logOut}
          />

          <div className="w-100 f-bottom">
            <div className="s-divider"></div>
            <SidebarRow
              path="/app/config"
              Icon={FingerprintIcon}
              title="Control Panel Config"
            />
            <SidebarRow
              path="/app/documentation"
              Icon={AutoStoriesIcon}
              title="Documentation"
            />
            <SidebarRow
              path="/app/notifications"
              Icon={NotificationsActiveIcon}
              title="Notification"
            />
            <div className="header__info" style={{marginTop: 20}}>
              <div className="user__avatar bg-warning">
                <h3>
                  {getInitials(user?.fname)}
                  {getInitials(user?.lname)}
                </h3>
              </div>
              <h4 className="title-case c-chalk">
                {" "}
                {user?.fname} {user?.lname} <br />
                <span className="summary__label font-9 role">
                  {user?.accountType}
                </span>
              </h4>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;

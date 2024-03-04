import React, { useEffect } from "react";
import SidebarRow from "./SidebarRow";
import SpeedIcon from "@material-ui/icons/Speed";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import GroupsIcon from "@mui/icons-material/Groups";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EmailIcon from "@mui/icons-material/Email";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import BuildIcon from "@mui/icons-material/Build";
import LuggageIcon from "@mui/icons-material/Luggage";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import HubIcon from "@mui/icons-material/Hub";
import { useUser } from "../../context/UserContext";
import logo from "../../assets/imgs/pmall_logo_200.png";
import "./Builder.css";

function Sidebar() {
  const { user } = useUser();
  console.log(user);
  const getInitials = (name) => {
    if (name) {
      let arr = name?.split("");
      return arr[0];
    }
    return false;
  };
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    window.reload();
    console.log(user);
  };

  return (
    // {}
    <div className="sidebar no-print">
      <div className="logo__holder">
        <img src={logo} alt="Pmall" style={{ width: 130 }} />
        {/* <h3> Logo </h3> */}
      </div>

      <div className="s-divider"></div>
      {/* <h3 className="ml-20p"> Administrators </h3> */}
      <SidebarRow path="/app/dashboard" Icon={SpeedIcon} title="Dashboard" />
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
        path="/app/vendors"
        Icon={GroupsIcon}
        title="Vendor Resources"
      />
      <SidebarRow
        path="/app/users"
        Icon={AccessibilityNewIcon}
        title="User Management"
      />

      <div className="s-divider"></div>
      {/* <SidebarRow path="/app/front-desk"  Icon={HomeWorkIcon} title="Front Desk"/> */}
      <SidebarRow
        path="/app/affilates"
        Icon={HubIcon}
        title="Affiliate Management"
      />
      <SidebarRow
        path="/app/products"
        Icon={ShoppingCartIcon}
        title="Product Management"
      />
      <SidebarRow
        path="/app"
        Icon={DirectionsCarIcon}
        title="Dispatch Management"
      />
      <SidebarRow path="/app" Icon={EmailIcon} title="Messaging/Support" />

      <SidebarRow
        path="/app"
        Icon={CreditCardIcon}
        title="Transaction Records"
      />

      <SidebarRow path="/app" Icon={AssignmentIcon} title="PMall Reports" />
      <SidebarRow
        path="/"
        Icon={PowerSettingsNewIcon}
        title="Log Out"
        onClick={handleLogOut()}
      />

      <div className="w-100 abs f-bottom">
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
        <div className="header__info">
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
  );
}

export default Sidebar;

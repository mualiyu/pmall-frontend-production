import React from "react";
import { Link } from "react-router-dom";
import { useVendor } from "../../context/VendorSignupContext";
import "./Builder.css";

function SidebarRow({ Icon, title, path, onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  const {
    setVisible,
  } = useVendor();
  const handleLinkClick = () => {
    setVisible(false);
  };
  return (
    <Link to={path} style={{ textDecoration: "none" }} onClick={handleLinkClick}>
      <div className="sidebarRow alc" onClick={handleClick}>
        {Icon && <Icon className="sidebar__icon icon___light icon___normal" />}
        <p className="sidebar__title"> {title} </p>
      </div>
    </Link>
  );
}

export default SidebarRow;

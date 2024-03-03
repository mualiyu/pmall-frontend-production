import React from "react";

export default function Toaster(text, type) {
  return (
    <div className={`alert ${text ? "active" : null} ${type}`}>
      <span>{text}</span>
    </div>
  );
}

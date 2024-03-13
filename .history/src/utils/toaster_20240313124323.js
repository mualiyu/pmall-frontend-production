import React from "react";

export default function Toaster(text) {
  return (
    <div className={`alert ${text ? "active" : null}`}>
      <span>{text}</span>
    </div>
  );
}

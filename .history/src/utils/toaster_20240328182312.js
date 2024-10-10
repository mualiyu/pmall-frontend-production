import React from "react";

export default function Toaster({ text, className }) {
  let backgroundColor = "";
  if (className === "error") {
    backgroundColor = "red";
  } else if (className === "success") {
    backgroundColor = "#10ac7e47";
  }

  return (
    <div
      className={`alert ${className} ${text && "active"}`}
      style={{ backgroundColor }}>
      <span>{text}</span>
    </div>
  );
}

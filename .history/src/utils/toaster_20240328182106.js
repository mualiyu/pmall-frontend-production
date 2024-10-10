import React from "react";

export default function Toaster({ text, className }) {
  let backgroundColor = "";
  let color = "";
  if (className === "error") {
    backgroundColor = "red";
    color = "#097756";
  } else if (className === "success") {
    backgroundColor = "#10ac7e47";
    color = "#097756";
  }

  return (
    <div
      className={`alert ${className} ${text && "active"}`}
      style={{ backgroundColor }}>
      <span>{text}</span>
    </div>
  );
}

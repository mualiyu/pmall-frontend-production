import React from "react";

export default function Toaster({ text, className }) {
  let backgroundColor = "";
  if (className === "error") {
    backgroundColor = "red";
  } else if (className === "success") {
    backgroundColor = "green";
  }

  return (
    <div className={`alert ${className}`} style={{ backgroundColor }}>
      <span>{text}</span>
    </div>
  );
}

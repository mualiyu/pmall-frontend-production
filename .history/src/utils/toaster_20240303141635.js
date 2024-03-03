import React from "react";

export default function Toaster({ text }: { text: string }) {
  return (
    <div className={`alert ${text ? "active" : null}`}>
      <span>{text}</span>
    </div>
  );
}

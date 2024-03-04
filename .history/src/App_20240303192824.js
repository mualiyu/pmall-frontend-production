import React from "react";
import "./App.css";
import "./assets/fonts/fonts/fonts.css";
import Application from "./components";
// import { UserProvider } from "../context/UserContext";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <div className="layout">
      <UserProvider>
        <Application />
      </UserProvider>
    </div>
  );
}

export default App;

import React from "react";
import "./App.css";
import "./assets/fonts/fonts/fonts.css";
import Application from "./components";
// import { UserProvider } from "../context/UserContext";
import { UserProvider } from "./context/UserContext";
import { VendorSignupProvider } from "./context/VendorSignupContext";

function App() {
  return (
    <div className="layout">
      <VendorSignupProvider>
      <UserProvider>
        <Application />
      </UserProvider>
      </VendorSignupProvider>
    </div>
  );
}

export default App;

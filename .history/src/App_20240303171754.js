import React from "react";
import "./App.css";
import "./assets/fonts/fonts/fonts.css";
import Application from "./components";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <div className="layout">
        <Application />
      </div>
    </UserProvider>
  );
}

export default App;

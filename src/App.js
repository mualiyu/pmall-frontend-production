import React from "react";
import "./App.css";
import "./assets/fonts/fonts/fonts.css";
import Application from "./components";
import { UserProvider } from "./context/UserContext";
import { VendorSignupProvider } from "./context/VendorSignupContext";
import { CartProvider } from "./context/CartContext";
import { CategoryProvider } from "./context/CategoryContext";

function App() {
  return (
    <div className="layout">
      <VendorSignupProvider>
        <UserProvider>
        <CategoryProvider>
          <CartProvider>
            <Application />
          </CartProvider>
          </CategoryProvider>
        </UserProvider>
      </VendorSignupProvider>
    </div>
  );
}

export default App;

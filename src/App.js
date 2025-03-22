import React from "react";
import "./App.css";
import "./assets/fonts/fonts/fonts.css";
import Application from "./components";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { CategoryProvider } from "./context/CategoryContext";

function App() {
  return (
    <div className="layout">
      <AuthProvider>
        <UserProvider>
        <CategoryProvider>
          <CartProvider>
            <Application />
          </CartProvider>
          </CategoryProvider>
        </UserProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

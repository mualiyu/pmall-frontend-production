import React, { useState, useEffect, createContext, useContext } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartLength,setCartLength] =  useState(0)
  const [cart2, setCart2] = useState(() => {
    // Load user data from localStorage if available
    const storedCart = localStorage.getItem("pmallCart");
    return storedCart
      ? JSON.parse(storedCart)
      : {};
  });

  const getCart = () => {
    if(typeof localStorage !== "undefined") {
         setCart2(JSON.parse(localStorage.getItem('pmallCart')) || [])
    }
    return;
}

  useEffect(()=>{ 
    getCart()
    setCartLength(cart2.length)
    return;
},[])

  return (
    <CartContext.Provider value={{ cart2, setCart2,cartLength }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };

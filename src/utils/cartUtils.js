export const getCart = () => {
  try {
    if (typeof window !== "undefined" && localStorage) {
      const cart = localStorage.getItem("pmallCart");
      return cart ? JSON.parse(cart) : [];
    }
  } catch (error) {
    console.error("Error retrieving cart:", error);
    return [];
  }
  return [];
};


export const addToCart = (detail, numOfItems, setCartCount, setCartModalActive) => {
  let cart = getCart(); // Retrieve current cart

  // Check if the product is already in the cart
  const isProductInCart = cart.some((item) => item.id === detail.id);

  if (isProductInCart) {
    alert(`${detail.name} is already in your cart!`); 
  } else {
    cart.push({ ...detail, amtItems: numOfItems });
    localStorage.setItem("pmallCart", JSON.stringify(cart));

    if (setCartModalActive) {
      setCartModalActive(true);
  }
  }

  if (setCartCount) {
    setCartCount(cart.reduce((total, item) => total + item.amtItems, 0)); // Ensure count reflects total items, not just unique products
  }
  
};

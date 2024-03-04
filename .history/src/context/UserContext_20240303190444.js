import React, { useState, createContext, useContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    token: "",
    accountType: "",
    storeName: "",
    storeId: "",
    loggedIn: false,
  });

  const updateUser = (userData) => {
    // Create a new object with updated user data
    const updatedUser = { ...user, ...userData };
    // Update the user state with the new object
    setUser(updatedUser);
    console.log(user);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUser };

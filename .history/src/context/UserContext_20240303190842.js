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
    // console.log(userData);
    // const updatedUser = { ...user, ...userData };
    // Update the user state with the new object
    setUser({
      username: userData.username,
      email: userData.email,
      token: userData.token,
      accountType: userData.accountType,
      storeName: userData.storeName,
      storeId: userData.storeId,
      loggedIn: true,
    });
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

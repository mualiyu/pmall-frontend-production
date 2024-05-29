import React, { useState, useEffect, createContext, useContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load user data from localStorage if available
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : {
          username: "",
          email: "",
          token: "",
          accountType: "",
          storeName: "",
          storeId: "",
          fname: "",
          lname: "",
          userAvatar: "",
          refId: "",
          regDate: "",
          loggedIn: false,
        };
  });

  useEffect(() => {
    // Save user data to localStorage whenever it changes
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
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

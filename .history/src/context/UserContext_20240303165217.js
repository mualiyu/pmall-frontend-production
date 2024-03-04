import React, { useState, createContext, useContext } from 'react';

// Create a UserContext
const UserContext = createContext();

// Create a UserProvider component
const UserProvider = ({ children }) => {
  // Initialize relevant fields in the state
  const [user, setUser] = useState({
    username: '',
    email: '',
    token:'',
    accountType

    loggedIn: false,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Export the UserProvider and useUser hook
export { UserProvider, useUser };

import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getUsernameFromEmail } from '../utils/helpers';

// 1. Create the Context object
const UserContext = createContext();

// Hook to easily consume the context
export const useUserContext = () => {
  return useContext(UserContext);
};

// 2. The Provider component
export const UserProvider = ({ children }) => {
  // Try to load user info from local storage on initial load
  const [user, setUser] = useState(() => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  });

  // 3. Login function: Saves user info and token to state and local storage
  const login = (userInfo) => {
    setUser(userInfo);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    const username = getUsernameFromEmail(userInfo.email);
    toast.success(`Welcome to ThinkBoard, ${username}!`, {
      duration: 4000,
      icon: '👋',
    });
  };

  // 4. Logout function: Clears state and local storage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
    toast.success('Logged out successfully.');
    // The App component will handle the redirect
  };

  // 5. The value provided to components
  const value = {
    user,
    login,
    logout,
    token: user ? user.token : null, // Easily access the token
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
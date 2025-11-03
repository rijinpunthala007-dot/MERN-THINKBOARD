import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

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
    try {
      const userInfo = localStorage.getItem('userInfo');
      return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      return null;
    }
  });

  // 3. Login function: Saves user info and token to state and local storage
  const login = (userInfo) => {
    try {
      setUser(userInfo);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      toast.success('Successfully logged in!');
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
      setUser(userInfo); // Still set user in state even if localStorage fails
      toast.success('Successfully logged in!');
    }
  };

  // 4. Logout function: Clears state and local storage
  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem('userInfo');
      toast.success('Logged out successfully.');
    } catch (error) {
      console.error('Error removing user from localStorage:', error);
      setUser(null); // Still clear user from state
      toast.success('Logged out successfully.');
    }
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
import React, { createContext, useContext, useState } from 'react';

// 1. Create the Context object
const UserContext = createContext();

// Hook to easily consume the context
export const useUserContext = () => {
  return useContext(UserContext);
};

// 2. The Provider component
export const UserProvider = ({ children }) => {
  // Try to load user info from local storage on initial load
  const getInitialUser = () => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const [user, setUser] = useState(getInitialUser);

  // 3. Login function: Saves user info and token to state and local storage
  const login = (userInfo) => {
    setUser(userInfo);
    try { localStorage.setItem('user', JSON.stringify(userInfo)); } catch {}
  };

  // 4. Logout function: Clears state and local storage
  const logout = () => {
    setUser(null);
    try { localStorage.removeItem('user'); } catch {}
  };

  // 5. The value provided to components
  const value = {
    user,
    login,
    logout,
    token: user ? user.token : null,
  };

  // IMPORTANT: actually return the Provider so children render consistently
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
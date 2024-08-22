import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the user object
type User = {
  userId: string;
  email: string;
  isAdmin: boolean;
  sessionId: string;
};

// Define the shape of the context value
type UserContextType = {
  user: User;
  updateUser: (newUserData: Partial<User>) => void;
};

// Default context value
const defaultUserContextValue: UserContextType = {
  user: {
    userId: "",
    email: "",
    isAdmin: false,
    sessionId: ""
  },
  updateUser: () => {}
};

// Create the context with the default value
const UserContext = createContext<UserContextType>(defaultUserContextValue);

type UserProviderProps = {
  children: ReactNode; // This defines that children can be any valid React node
};

// Define the provider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    userId: "",
    email: "",
    isAdmin: false,
    sessionId: ""
  });

  // Update user data (could be from login or other operations)
  const updateUser = (newUserData: Partial<User>) => {
    setUser((prevUser) => ({ ...prevUser, ...newUserData }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = (): UserContextType => {
  return useContext(UserContext);
};

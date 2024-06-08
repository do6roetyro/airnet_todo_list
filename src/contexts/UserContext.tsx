import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export interface User {
  id: string; // Изменение типа id на string
  firstName: string;
  lastName: string;
  email: string;
  tasks: {
    [year: number]: {
      [month: number]: {
        [day: number]: Task[];
      };
    };
  };
}

export interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Hook useUser должен использоваться внутри UserProvider");
  }
  return context;
};
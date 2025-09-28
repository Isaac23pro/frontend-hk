import React, { createContext, useState, useContext, ReactNode } from 'react';

type UserRole = 'Estudiante' | 'Docente' | 'Comunidad' | 'Moderador';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Mock login function
  const login = async (email: string, pass: string) => {
    console.log('Attempting login with:', email, pass);
    // In a real app, you'd make an API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: '1',
          name: 'Jules Verne',
          email: email,
          role: 'Estudiante', // Default role for mock
        };
        setUser(mockUser);
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
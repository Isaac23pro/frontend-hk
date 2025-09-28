import React, { createContext, useState, useContext, ReactNode } from 'react';

export type UserRole = 'Estudiante' | 'Docente' | 'Comunidad' | 'Moderador';

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

  // Mock login function with role simulation
  const login = async (email: string, pass: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        let role: UserRole = 'Estudiante'; // Default role
        let name = 'Usuario Estudiante';

        if (email.startsWith('moderador')) {
          role = 'Moderador';
          name = 'Usuario Moderador';
        } else if (email.startsWith('docente')) {
          role = 'Docente';
          name = 'Usuario Docente';
        } else if (email.startsWith('comunidad')) {
          role = 'Comunidad';
          name = 'Usuario Comunidad';
        }

        const mockUser: User = {
          id: `${role}-${Date.now()}`,
          name: name,
          email: email,
          role: role,
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
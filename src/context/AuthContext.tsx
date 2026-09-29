import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  login: (email?: string, role?: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: 'USR-DEMO-001',
    name: 'Special Investigator Vance',
    email: 'investigator@soc.internal',
    role: 'Analyst',
    agency: 'Academic Cyber Threat Unit',
    createdAt: '2025-01-01T00:00:00Z'
  });

  const role = user?.role || 'Analyst';

  const setRole = (newRole: UserRole) => {
    if (user) {
      setUser({ ...user, role: newRole });
    }
  };

  const login = (email = 'investigator@soc.internal', newRole: UserRole = 'Analyst') => {
    setUser({
      id: 'USR-DEMO-001',
      name: 'Special Investigator Vance',
      email,
      role: newRole,
      agency: 'Academic Cyber Threat Unit',
      createdAt: '2025-01-01T00:00:00Z'
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, setRole, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

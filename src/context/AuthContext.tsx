import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'public' | 'admin';

interface AuthContextType {
  userRole: UserRole;
  loginAsAdmin: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  userRole: 'public',
  loginAsAdmin: () => {},
  logout: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>(() => {
    try {
      return localStorage.getItem('kalantar_user_role') === 'admin' ? 'admin' : 'public';
    } catch {
      return 'public';
    }
  });

  const loginAsAdmin = () => {
    setUserRole('admin');
    try {
      localStorage.setItem('kalantar_user_role', 'admin');
    } catch {}
  };

  const logout = () => {
    setUserRole('public');
    try {
      localStorage.setItem('kalantar_user_role', 'public');
    } catch {}
  };

  return (
    <AuthContext.Provider value={{ userRole, loginAsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

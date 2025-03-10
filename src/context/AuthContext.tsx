// AuthContext.tsx
'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { API } from '@/libs/api'; // Import the API instance
import apiEndpoints from '@/libs/api-endpoints'; // Import the API endpoints

interface User {
  firstname: string;
  lastname: string;
  profileImage: string;
  email: string;
  // Add other user fields if needed
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null; // Update user type
  login: (token: string, user: User) => void;
  logout: () => void;
  updateProfile: (updatedUser: Partial<User>) => Promise<void>; // Add updateProfile function
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null); // Update user state type

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData)); // Parse user data from local storage
    }
  }, []);

  const login = (token: string, user: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user)); // Save user data to local storage
    setIsAuthenticated(true);
    setUser(user); // Update user state
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Remove user data from local storage
    setIsAuthenticated(false);
    setUser(null); // Clear user state
  };

  const updateProfile = async (updatedUser: Partial<User>) => {
    try {
      const response = await API.put(apiEndpoints.admin.updateProfile, updatedUser);
      if (response.data.success) {
        const updatedUserData = { ...user, ...updatedUser }; // Merge updated fields
        setUser(updatedUserData as User); // Update user state
        localStorage.setItem('user', JSON.stringify(updatedUserData)); // Update local storage
      } else {
        throw new Error(response.data.message || 'Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
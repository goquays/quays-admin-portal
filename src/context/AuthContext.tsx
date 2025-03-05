// context/AuthContext.tsx
'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string, user: any) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Token from localStorage:', token); // Debugging
        if (token) {
          setIsAuthenticated(true); // Set isAuthenticated to true if a token exists
          console.log('isAuthenticated set to true'); // Debugging
        }
      }, []);
      
      const login = (token: string, user: any) => {
        console.log('Saving token to localStorage:', token); // Debugging
        localStorage.setItem('token', token); // Save access token to localStorage
        localStorage.setItem('user', JSON.stringify(user)); // Save user data to localStorage
        setIsAuthenticated(true); // Update authentication state
        // console.log('isAuthenticated set to true after login'); // Debugging
      };
      
      const logout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
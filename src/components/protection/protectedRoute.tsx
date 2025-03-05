'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../loading-spinner/loading-spinner';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  // console.log('isAuthenticated in ProtectedRoute:', isAuthenticated); // Debugging

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, redirecting to login page');
      router.push('/admin-login');
    } else {
      // console.log('Token found, user is authenticated');
      setIsLoading(false); // Stop loading once authentication is confirmed
    }
  }, [isAuthenticated, router]);

  // Show a loading spinner while checking authentication
  if (isLoading) {
    return <div>
      <LoadingSpinner/>
    </div>;
  }

  // If not authenticated, return null (redirect will happen in useEffect)
  if (!isAuthenticated) {
    return null;
  }

  // If authenticated, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
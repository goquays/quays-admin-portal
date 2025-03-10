// app/layout.tsx
import AdminLayout from '@/components/admin-layout/admin-layout';
import { AuthProvider } from '@/context/AuthContext';
import React from 'react';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
      <div>
        <AuthProvider>
          <AdminLayout>{children}</AdminLayout>
        </AuthProvider>
      </div>
  );
};

export default RootLayout;
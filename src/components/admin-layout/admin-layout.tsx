// AdminLayout (admin-layout.tsx)
'use client';
import { AdminHeader } from '@/components/partials/admin-header';
import AdminSidebar from '@/components/partials/admin-sidebar';
import { useAuth } from '@/context/AuthContext';
import React from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const firstname = user?.firstname || 'Guest';
  const lastname = user?.lastname || '';
  const profileImage = user?.profileImage || ''; // Provide a default value for profileImage
  const email = user?.email || ''; // Provide a default value for email

  return (
    <div className="flex min-h-screen">
      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-[25%] bg-[#000034] text-white p-10">
        <AdminSidebar />
      </div>

      {/* Main Content (Offset by Sidebar Width) */}
      <div className="flex-1 flex flex-col ml-[25%]">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10">
          <AdminHeader firstname={firstname} lastname={lastname} profileImage={profileImage} email={email} />
        </div>

        {/* Scrollable Main Content */}
        <main className="flex-1 p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
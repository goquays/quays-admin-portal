import { AdminHeader } from '@/components/partials/admin-header';
import AdminSidebar from '@/components/partials/admin-sidebar';
import { AuthProvider } from '@/context/AuthContext';
import React from 'react';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="font-[Montserrat]">
      <AuthProvider>
        <div className="flex min-h-screen">
          {/* Fixed Sidebar */}
          <div className="fixed top-0 left-0 h-screen w-[25%] bg-[#000034] text-white p-10">
            <AdminSidebar />
          </div>

          {/* Main Content (Offset by Sidebar Width) */}
          <div className="flex-1 flex flex-col ml-[25%]">
            {/* Sticky Header */}
            <div className="sticky top-0 z-10">
              <AdminHeader />
            </div>

            {/* Scrollable Main Content */}
            <main className="flex-1 p-10 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </AuthProvider>
    </div>
  );
};

export default Layout;
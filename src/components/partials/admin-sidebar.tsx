'use client';
import Image from 'next/image';
import Logo from '/public/assets/images/Quays-Logo-White.png';
import NavItem from '../navbar/nav-item';
import { useState } from 'react';
import { MdOutlineLogout } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import LogoutConfirmationModal from '../modals/LogoutConfirmationModal';
import LogoutSuccessModal from '../modals/LogoutSuccessModal';
import { useAuth } from '@/context/AuthContext';

// Define the possible modal states
type ModalState = 'confirmation' | 'success' | null;

const AdminSidebar: React.FC = () => {
  const [modalState, setModalState] = useState<ModalState>(null); // Single state for modal management
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    setModalState('confirmation'); // Open the confirmation modal
  };

  const confirmLogout = () => {
    logout;
    setModalState('success'); // Open the success modal
    setTimeout(() => {
      router.push('/admin-login'); // Redirect to the login page
    }, 2000);
  };

  const cancelLogout = () => {
    setModalState(null); // Close the confirmation modal
  };

  const closeSuccessModal = () => {
    setModalState(null); // Close the success modal
  };

  return (
    <aside className="">
      <div className="mb-12">
        <Image src={Logo} alt="Quays Logo" width={116} height={48} />
      </div>

      <nav>
        <div className="mb-2 text-xl opacity-80">Main menu</div>
        <ul className="space-y-4">
          <NavItem href="/admin/dashboard" icon="dashboard" label="Dashboard" />
          <NavItem
            href="/admin/push-notifications"
            icon="notification"
            label="Push Notifications"
          />
          {/* Logout button with onClick handler */}
          <li>
            <div
              className="p-3 rounded-md hover:bg-[#33336f] cursor-pointer"
              onClick={handleLogout}
            >
              <div className="flex gap-4 items-center">
                <MdOutlineLogout size={24} className="text-white" />
                <span className="text-xl">Logout</span>
              </div>
            </div>
          </li>
        </ul>
      </nav>

      {/* Logout confirmation modal */}
      {modalState === 'confirmation' && (
        <LogoutConfirmationModal onCancel={cancelLogout} onConfirm={confirmLogout} />
      )}

      {/* Logout success modal */}
      {modalState === 'success' && <LogoutSuccessModal onClose={closeSuccessModal} />}
    </aside>
  );
};

export default AdminSidebar;
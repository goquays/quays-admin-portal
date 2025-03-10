import Image from 'next/image';
import React, { useState } from 'react';
import User from '/public/assets/images/user-image.png';
import { MdClose, MdKeyboardArrowDown, MdEdit } from 'react-icons/md';
import profileImageMale from '/public/assets/images/profile-image-m.jpg';
import profileImageFemale from '/public/assets/images/profile-image-f.jpg';
import { FaCamera, FaRegCheckCircle } from 'react-icons/fa';
import { API } from '@/libs/api';
import apiEndpoints from '@/libs/api-endpoints';
import { BsDash } from 'react-icons/bs';
import { useAuth } from '@/context/AuthContext';

interface AdminHeaderProps {
  firstname: string; // Add firstName as a prop
  lastname: string; // Add lastName as a prop
  profileImage?: string; // Make profileImage optional
  email: string; // Add email as a prop
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ firstname, lastname, profileImage, email }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // State for profile management modal
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // State for password change modal
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // State for success modal

  const [newProfileImage, setNewProfileImage] = useState<string | null>(null); // State for new profile image
  const [oldPassword, setOldPassword] = useState(''); // State for old password
  const [newPassword, setNewPassword] = useState(''); // State for new password
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
  const [isPasswordChanged, setIsPasswordChanged] = useState(false); // State to track password changes
  const { user, updateProfile } = useAuth();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  const openProfileModal = () => {
    setIsProfileModalOpen(true); // Open the profile management modal
    setIsDropdownOpen(false); // Close the dropdown
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false); // Close the profile management modal
    setNewProfileImage(null); // Reset new profile image
    setIsPasswordChanged(false); // Reset password change state
  };

  const openPasswordModal = () => {
    setIsPasswordModalOpen(true); // Open the password change modal
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false); // Close the password change modal
    setOldPassword(''); // Reset old password
    setNewPassword(''); // Reset new password
    setConfirmPassword(''); // Reset confirm password
  };

  const openSuccessModal = () => {
    setIsSuccessModalOpen(true); // Open the success modal
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false); // Close the success modal
  };

  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // UI Preview
    const reader = new FileReader();
    reader.onload = () => setNewProfileImage(reader.result as string);
    reader.readAsDataURL(file);

    // Prepare FormData
    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const response = await API.put(apiEndpoints.admin.updateProfile, formData);

      if (response.data.success) {
        const updatedProfileImage = response.data.data.profileImage;

        // Update user context
        updateProfile({ profileImage: updatedProfileImage });

        // Persist in localStorage
        const updatedUser = { ...user, profileImage: updatedProfileImage };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        throw new Error(response.data.message || 'Failed to update profile image.');
      }
    } catch (error) {
      console.error('Error updating profile image:', error);
      alert('Failed to update profile image. Please try again.');
    }
  };

  const uploadProfileImage = async (file: File) => {
    const formData = new FormData();
    formData.append('profileImage', file); // Append the file to the FormData object

    try {
      const response = await API.put(apiEndpoints.admin.updateProfile, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file upload
        },
      });

      if (response.data.success) {
        return response.data.data.profileImage; // Return the new profile image URL
      } else {
        throw new Error(response.data.message || 'Failed to upload profile image.');
      }
    } catch (error: any) {
      console.error('Error uploading profile image:', error);
      throw new Error(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    setIsPasswordChanged(true); // Enable save button in profile modal
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSaveProfile = async () => {
    try {
      if (newProfileImage) {
        // Update the profile image
        await updateProfile({ profileImage: newProfileImage });
      }

      if (isPasswordChanged) {
        // Handle password change (already implemented)
      }

      openSuccessModal(); // Open success modal
      closeProfileModal(); // Close profile management modal
    } catch (error) {
      console.error('Error saving profile changes:', error);
      alert('Failed to save profile changes. Please try again.');
    }
  };

  const handleSavePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }

    try {
      const payload = {
        oldPassword,
        newPassword,
        confirmPassword,
      };

      const response = await API.post(apiEndpoints.admin.changePassword, payload);

      if (response.data.success) {
        setIsPasswordChanged(true); // Enable save button in profile modal
        closePasswordModal(); // Close password change modal
        alert('Password changed successfully.');
      } else {
        alert(response.data.message || 'Failed to change password.');
      }
    } catch (error: any) {
      console.error('Error changing password:', error);
      alert(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <header className='flex flex-row px-10 py-6 items-center justify-between shadow-md font-[Inter] sticky top-0 z-10 bg-[#fffaf6]'>
      <div className="text-2xl font-semibold">Welcome, {firstname}</div>
      <div className='relative'>
        <div
          className='flex gap-4 p-2 cursor-pointer items-center rounded-md hover:shadow-md'
          onClick={toggleDropdown}
        >
          <Image src={profileImage || profileImageMale} alt='User Image' width={40} height={40} className='rounded-full' />
          <span className='text-base font-medium'>{`${firstname} ${lastname}`}</span>
          <MdKeyboardArrowDown />
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg'>
            <div
              className='p-2 hover:bg-gray-100 cursor-pointer'
              onClick={openProfileModal}
            >
              Profile Management
            </div>
          </div>
        )}
      </div>

      {/* Profile Management Modal */}
      {isProfileModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='bg-white rounded-lg shadow-lg text-center max-w-md w-full mx-4'>
            <div className="flex justify-end p-4">
              <MdClose size={24} className="text-black cursor-pointer" onClick={closeProfileModal} />
            </div>

            {/* Change Profile Picture */}
            <div className='mb-4 px-6'>
              <div className='flex flex-col items-center'>
                <div className='relative'>
                  <Image
                    src={newProfileImage || profileImage || profileImageMale}
                    alt='User Image'
                    width={158}
                    height={158}
                    className='rounded-full shadow-md'
                  />
                  <label htmlFor="profileImage" className='absolute bottom-2 right-2 p-2 rounded-full bg-white cursor-pointer'>
                    <FaCamera size={16} />
                  </label>
                  <input
                    id="profileImage"
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={handleProfileImageChange}
                  />
                </div>
                <span className='text-lg font-medium mt-2'>{`${firstname} ${lastname}`}</span>
              </div>
            </div>

            {/* User Details */}
            <div className='mb-4 px-6'>
              <label className='block text-sm font-medium text-gray-700 mb-2 text-left'>
                Email
              </label>
              <input
                type='email'
                value={email}
                disabled
                className="mt-1 block w-full px-3 py-2 border custom-placeholder placeholder-gray-400 border-gray-200 rounded-3xl shadow-sm focus:outline-none focus:ring-gray-700 focus:border-gray-700 bg-gray-100"
              />
              <label className='block text-sm font-medium text-gray-700 mb-2 mt-4 text-left'>
                Password
              </label>
              <div className='relative'>
                <input
                  type='password'
                  value="********"
                  disabled
                  className="mt-1 block w-full px-3 py-2 border custom-placeholder placeholder-gray-400 border-gray-200 rounded-3xl shadow-sm focus:outline-none focus:ring-gray-700 focus:border-gray-700 bg-gray-100"
                />
                <MdEdit
                  size={20}
                  className='absolute right-3 top-3 text-gray-500 cursor-pointer'
                  onClick={openPasswordModal}
                > Change</MdEdit>
              </div>
            </div>

            {/* Buttons */}
            <div className='flex justify-end gap-4 p-6'>
              <button
                onClick={closeProfileModal}
                className='bg-transparent text-gray-900 px-12 py-2 rounded-full border'
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={!newProfileImage && !isPasswordChanged}
                className='bg-[#000034] text-white py-2 px-4 rounded-3xl hover:bg-[#000034] focus:outline-none focus:ring-2 focus:ring-[#000034] focus:ring-offset-2'
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Change Modal */}
      {isPasswordModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='bg-white rounded-lg shadow-lg text-center max-w-md w-full mx-4'>
            <div className="flex justify-end p-4">
              <MdClose size={24} className="text-black cursor-pointer" onClick={closePasswordModal} />
            </div>

            {/* Change Password */}
            <div className='mb-4 px-6'>
              <label className='block text-sm font-medium text-gray-700 mb-2 text-left'>
                Old Password
              </label>
              <input
                type='password'
                placeholder='Old Password'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded-lg mb-4'
              />
              <label className='block text-sm font-medium text-gray-700 mb-2 text-left'>
                New Password
              </label>
              <input
                type='password'
                placeholder='New Password'
                value={newPassword}
                onChange={handlePasswordChange}
                className='w-full p-2 border border-gray-300 rounded-lg mb-4'
              />
              <label className='block text-sm font-medium text-gray-700 mb-2 text-left'>
                Confirm New Password
              </label>
              <input
                type='password'
                placeholder='Confirm New Password'
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className='w-full p-2 border border-gray-300 rounded-lg'
              />
            </div>

            {/* Buttons */}
            <div className='flex justify-end gap-4 p-6'>
              <button
                onClick={closePasswordModal}
                className='bg-transparent text-gray-900 px-12 py-2 rounded-full border'
              >
                Cancel
              </button>
              <button
                onClick={handleSavePassword}
                disabled={newPassword !== confirmPassword || !newPassword || !oldPassword}
                className='bg-[#000034] text-white py-2 px-4 rounded-3xl hover:bg-[#000034] focus:outline-none focus:ring-2 focus:ring-[#000034] focus:ring-offset-2'
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='bg-white rounded-lg shadow-lg text-center max-w-md w-full mx-4'>
            <div className="flex justify-end py-6 px-4 gap-4 border-b border-gray-200">
              <MdClose size={24} className="text-black cursor-pointer" onClick={closeSuccessModal} />
            </div>

            <div className="px-8 py-4 border-b border-gray-200">
              <div className="flex justify-center mb-2">
                <div className="bg-green-100 p-2 flex flex-col rounded-full w-min self-center">
                  <div className="bg-green-300 p-2 self-center rounded-full w-min">
                    <FaRegCheckCircle className="text-green-400" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-black">Update Successful</h3>
              <p className="text-gray-600 mb-6">You have successfully updated your profile.</p>
            </div>
            <div className='px-6 py-4'>
              <button
                onClick={closeSuccessModal}
                className='w-full bg-[#000034] text-white py-2 px-4 rounded-3xl hover:bg-[#000034] focus:outline-none focus:ring-2 focus:ring-[#000034] focus:ring-offset-2'
              >
                Continue
              </button>
            </div>

          </div>
        </div>
      )
      }
    </header >
  );
};

function setUser(updatedUser: { profileImage: any; firstname?: string | undefined; lastname?: string | undefined; email?: string | undefined; }) {
  throw new Error('Function not implemented.');
}

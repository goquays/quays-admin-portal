// components/LogoutConfirmationModal.tsx
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { BsDash } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';

interface LogoutConfirmationModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function LogoutConfirmationModal({
  onCancel,
  onConfirm,
}: LogoutConfirmationModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg text-center max-w-md">
        <div className="flex justify-between py-6 px-4 gap-4 border-b border-gray-200">
          <BsDash size={24} className="text-black" />
          <MdClose size={24} className="text-black cursor-pointer" onClick={onCancel} />
        </div>
        <div className="px-8 py-4">
          <div className="flex justify-center mb-2">
            <div className="bg-pink-100 p-2 flex flex-col rounded-full w-min">
              <div className="bg-pink-300 p-2 self-center rounded-full w-min">
                <HiOutlineExclamationCircle className="text-rose-600" size={24} />
              </div>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-4 text-black">Log Out!</h3>
          <p className="text-gray-600 mb-6">Are you sure you want to logout from this account?</p>
        </div>
        <div className="flex justify-center gap-4 py-6 border-t border-gray-200">
          <button
            onClick={onCancel}
            className="bg-transparent text-gray-900 px-12 py-2 rounded-full border"
            aria-label="Cancel logout"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#000034] text-white py-2 px-12 rounded-3xl hover:bg-[#000034] focus:outline-none focus:ring-2 focus:ring-[#000034] focus:ring-offset-2"
            aria-label="Confirm logout"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
'use client';
import { FaRegCheckCircle } from 'react-icons/fa';
import { BsDash } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';

interface ExportSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

const ExportSuccessModal: React.FC<ExportSuccessModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg text-center max-w-md">
        <div className="flex justify-between py-6 px-4 gap-4 border-b border-gray-200">
          <BsDash size={24} className="text-black" />
          <MdClose size={24} className="text-black cursor-pointer" onClick={onClose} />
        </div>
        <div className="px-8 py-4">
          <div className="flex justify-center mb-2">
            <div className="bg-green-100 p-2 flex flex-col rounded-full w-min self-center">
              <div className="bg-green-300 p-2 self-center rounded-full w-min">
                <FaRegCheckCircle size={48} className="text-green-400" />
              </div>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-4 text-black">Export Successful</h3>
          <p className="text-gray-600 mb-6">{message || 'Your file has been successfully exported.'}</p>
        </div>
        <div className="flex justify-center gap-4 py-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="bg-[#000034] text-white py-2 px-12 rounded-3xl hover:bg-[#000034] focus:outline-none focus:ring-2 focus:ring-[#000034] focus:ring-offset-2"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportSuccessModal;
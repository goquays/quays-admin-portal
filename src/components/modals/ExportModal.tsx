import React, { useState } from 'react';
import ExportTable from '../table/export-table';
import { MdClose } from 'react-icons/md';
import ExportSuccessModal from './ExportSuccess';

interface ExportModalProps {
  onClose: () => void;
  onExport: () => Promise<void>; // Function to handle export
  columns: { key: string; label: string }[];
}

const ExportModal: React.FC<ExportModalProps> = ({ onClose, onExport, columns }) => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false); // Loading state

  const handleExport = async () => {
    try {
      setIsExporting(true); // Start loading
      await onExport(); // Call the export function
      setIsSuccessModalOpen(true); // Show success modal
    } catch (error) {
      setIsFailureModalOpen(true); // Show failure modal
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false); // Stop loading
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
          <div className="flex justify-between py-6 px-4 gap-4 border-b border-gray-200 font-[Inter]">
            <div className="text-base font-semibold mb-4">Export Data?</div>
            <MdClose size={24} className="text-black cursor-pointer" onClick={onClose} />
          </div>
          <div className="max-h-96 overflow-y-auto p-4">
            {isExporting ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-gray-600">Exporting data, please wait...</p>
              </div>
            ) : (
              <p className="text-gray-600">
                Are you sure you want to export the filtered data? This may take a few moments.
              </p>
            )}
          </div>
          <div className="flex justify-end gap-4 mt-4 py-6 border-t border-gray-20">
            <button
              onClick={onClose}
              className="border border-gray-300 text-black px-4 py-2 rounded-full"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting} // Disable button while exporting
              className="bg-[#000034] text-white px-4 py-2 rounded-full hover:bg-[#000034] disabled:opacity-50"
            >
              {isExporting ? 'Exporting...' : 'Export'}
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <ExportSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false); // Close the success modal
          onClose(); // Close the export modal
        }}
      />

      {/* Failure Modal */}
      {/* <FailureModal
        isOpen={isFailureModalOpen}
        onClose={() => setIsFailureModalOpen(false)}
      /> */}
    </>
  );
};

export default ExportModal;
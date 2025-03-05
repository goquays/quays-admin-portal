import React from 'react';
import ExportTable from '../table/export-table';
import { MdClose } from 'react-icons/md';

interface ExportModalProps {
    data: any[];
    onClose: () => void;
    onExport: () => void;
    columns: { key: string; label: string }[];
}

const ExportModal: React.FC<ExportModalProps> = ({ data, onClose, onExport, columns }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
        <div className="flex justify-between py-6 px-4 gap-4 border-b border-gray-200 font-[Inter]">
            <div className="text-base font-semibold mb-4">Export Data?</div>
            <MdClose size={24} className="text-black cursor-pointer" onClick={onClose} />
            </div>
            <div className="max-h-96 overflow-y-auto">
                <ExportTable data={data} startIndex={0} columns={columns} /> 
            </div>
            <div className="flex justify-end gap-4 mt-4 py-6 border-t border-gray-20">
                <button
                    onClick={onClose}
                    className="border border-gray-300 text-black px-4 py-2 rounded-full"
                >
                    Cancel
                </button>
                <button
                    onClick={onExport}
                    className="bg-[#000034] text-white px-4 py-2 rounded-full hover:bg-[#000034]"
                >
                    Export
                </button>
            </div>
        </div>
    </div>
);

export default ExportModal;
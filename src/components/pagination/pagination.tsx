// app/dashboard/signups/components/Pagination.tsx
import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface PaginationProps {
    rowsPerPage: number;
    totalPages: number;
    currentPage: number;
    handleRowsPerPageChange: (value: number) => void;
    goToPage: (page: number) => void;
    generatePageNumbers: () => (number | string)[];
}

const Pagination: React.FC<PaginationProps> = ({
    rowsPerPage,
    totalPages,
    currentPage,
    handleRowsPerPageChange,
    goToPage,
    generatePageNumbers,
}) => (
    <div className="flex justify-between items-center mt-5">
        <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Showing</span>
            <select
                value={rowsPerPage}
                onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded-md"
            >
                {[5, 10, 20, 50, 100].map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </select>
            <span className="text-sm font-semibold">rows</span>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Page</span>
            <div className="border border-gray-300 rounded-md">
                {generatePageNumbers().map((page, index) => (
                    <button
                        key={index}
                        onClick={() => typeof page === 'number' && goToPage(page)}
                        disabled={page === '...' || currentPage === page}
                        className={`w-10 h-10 items-center justify-center rounded-md ${
                            currentPage === page ? 'bg-[#000034] text-white' : 'bg-transparent'
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>
            <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 items-center justify-center flex bg-transparent border border-gray-300 rounded-md disabled:opacity-50"
            >
                <IoIosArrowBack size={14} />
            </button>
            <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 items-center justify-center flex bg-transparent border border-gray-300 rounded-md disabled:opacity-50"
            >
                <IoIosArrowForward size={14} />
            </button>
        </div>
    </div>
);

export default Pagination;
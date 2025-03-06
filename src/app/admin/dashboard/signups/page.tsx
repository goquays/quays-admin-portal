'use client';
import Link from 'next/link';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import * as XLSX from 'xlsx';
import DateInput from '@/components/inputs/date-input';
import Table from '@/components/table/table';
import Pagination from '@/components/pagination/pagination';
import ExportModal from '@/components/modals/ExportModal';
import RowDetailsModal from '@/components/modals/RowDetailsModal';
import { getUsers } from '@/libs/endpoints';
import ProtectedRoute from '@/components/protection/protectedRoute';


const columns = [
    { key: 'fullName', label: 'Full Name' },
    { key: 'email', label: 'Email Address' },
    { key: 'phoneNumber', label: 'Phone Number' },
    { key: 'dateCreated', label: 'Date Registered' },
    { key: 'signupSource', label: 'Signup Source' },
];

const SignupsPage = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [isRowDetailsModalOpen, setIsRowDetailsModalOpen] = useState<boolean>(false);
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const startDateRef = useRef<HTMLInputElement>(null);
    const endDateRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data.data.records);
            } catch (error) {
                console.error('Error loading users:', error);
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    // Normalize data before passing it to the Table or ExportModal
    const normalizedSignups = useMemo(() => {
        return users.map((user) => ({
            ...user,
            fullName: `${user.firstname || ''} ${user.lastname || ''}`.trim(), // Combine first and last name
        }));
    }, [users]);

    // Memoized filtered data
    const filteredSignups = useMemo(() => {
        return normalizedSignups.filter((user) => {
            const fullName = user.fullName.toLowerCase();
            const email = user.email ? user.email.toLowerCase() : '';
            const phoneNumber = user.phoneNumber || '';
            const signupSource = user.onboardingSource || '';

            const matchesSearchQuery =
                fullName.includes(searchQuery.toLowerCase()) ||
                email.includes(searchQuery.toLowerCase()) ||
                phoneNumber.includes(searchQuery) ||
                signupSource.includes(searchQuery);

            const matchesDateRange =
                (!startDate || user.dateCreated >= startDate) &&
                (!endDate || user.dateCreated <= endDate);

            return matchesSearchQuery && matchesDateRange;
        });
    }, [normalizedSignups, searchQuery, startDate, endDate]);

    // Pagination logic
    const totalRows = filteredSignups.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedSignups = useMemo(() => filteredSignups.slice(startIndex, endIndex), [filteredSignups, startIndex, endIndex]);

    // Handle rows per page change
    const handleRowsPerPageChange = useCallback((value: number) => {
        setRowsPerPage(value);
        setCurrentPage(1); // Reset to the first page
    }, []);

    // Handle page navigation
    const goToPage = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    // Generate page numbers with ellipsis
    const generatePageNumbers = useCallback(() => {
        const pages = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow + 1) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= maxPagesToShow - 1) {
                for (let i = 1; i <= maxPagesToShow; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - (maxPagesToShow - 2)) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - (maxPagesToShow - 1); i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    }, [currentPage, totalPages]);

    // Function to export data to Excel
    const exportToExcel = useCallback(async () => {
        try {
          const worksheet = XLSX.utils.json_to_sheet(filteredSignups);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Signups');
          XLSX.writeFile(workbook, 'signups.xlsx');
        } catch (error) {
          throw new Error('Failed to export data'); // Throw an error if export fails
        }
      }, [filteredSignups]);
      
    // Function to focus the date input when the wrapper is clicked
    const handleWrapperClick = useCallback((ref: React.RefObject<HTMLInputElement | null>) => {
        if (ref.current) {
            ref.current.focus();
            ref.current.showPicker();
        }
    }, []);

    // Function to handle row click
    const handleRowClick = (row: any) => {
        setSelectedRow(row);
        setIsRowDetailsModalOpen(true);
    };

    // Function to close the modal
    const closeRowDetailsModal = () => {
        setIsRowDetailsModalOpen(false);
        setSelectedRow(null);
    };

    return (
        <div>
            {/* Back button and search bar */}
            <div className="flex justify-start items-center gap-5 mb-5">
                <Link href="/admin/dashboard">
                    <IoIosArrowRoundBack size={24} className="text-black" />
                </Link>
                <input
                    type="text"
                    placeholder="Search by Name, Email, Phone Number, Date Registered..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-1/2 p-2 border border-gray-300 rounded-full bg-transparent placeholder:text-xs placeholder:opacity-75 focus:placeholder:text-sm"
                />
            </div>

            {/* Date filter */}
            <div className="flex justify-end gap-4 mb-5">
                <DateInput
                    ref={startDateRef}
                    value={startDate}
                    onChange={setStartDate}
                    placeholder="Select Start Date"
                    onClick={() => handleWrapperClick(startDateRef)}
                />
                <DateInput
                    ref={endDateRef}
                    value={endDate}
                    onChange={setEndDate}
                    placeholder="Select End Date"
                    onClick={() => handleWrapperClick(endDateRef)}
                />
                <button
                    onClick={() => { }}
                    className="bg-[#000034] text-white px-4 py-2 rounded-full hover:bg-[#000034]"
                >
                    Apply Date Range
                </button>
                <button
                    onClick={() => setIsExportModalOpen(true)}
                    className="bg-[#000034] text-white px-4 py-2 rounded-full hover:bg-[#000034]"
                >
                    Export Data
                </button>
            </div>

            {/* Table */}
            <Table data={paginatedSignups} startIndex={startIndex} columns={columns} onRowClick={handleRowClick} />

            {/* Pagination and rows per page dropdown */}
            <Pagination
                rowsPerPage={rowsPerPage}
                totalPages={totalPages}
                currentPage={currentPage}
                handleRowsPerPageChange={handleRowsPerPageChange}
                goToPage={goToPage}
                generatePageNumbers={generatePageNumbers}
            />

            {/* Export Modal */}
            {isExportModalOpen && (
                <ExportModal
                    data={filteredSignups}
                    onClose={() => setIsExportModalOpen(false)}
                    onExport={exportToExcel}
                    columns={columns}
                />
            )}

            {/* Row Details Modal */}
            <RowDetailsModal
                isOpen={isRowDetailsModalOpen}
                onClose={closeRowDetailsModal}
                rowData={selectedRow}
                type='signup'
            />
        </div>
    );
}

export default function Page() {
    return (
        <ProtectedRoute>
            <SignupsPage />
        </ProtectedRoute>
    )
}
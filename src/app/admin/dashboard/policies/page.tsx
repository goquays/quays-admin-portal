'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useRef, useMemo, useCallback } from 'react';
import * as XLSX from 'xlsx';
import DateInput from '@/components/inputs/date-input';
import Table from '@/components/table/table';
import Pagination from '@/components/pagination/pagination';
import ExportModal from '@/components/modals/ExportModal';
import RowDetailsModal from '@/components/modals/RowDetailsModal';
import { fetchPolicies } from '@/libs/endpoints';
import LoadingSpinner from '@/components/loading-spinner/loading-spinner';

const columns = [
  { key: 'fullName', label: 'Full Name' },
  { key: 'emailAddress', label: 'Email Address' },
  { key: 'phoneNumber', label: 'Phone Number' },
  { key: 'dateCreated', label: 'Date Registered' },
  { key: 'typeOfInsurance', label: 'Type of Insurance' }, // New column
];

export default function PoliciesPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [isRowDetailsModalOpen, setIsRowDetailsModalOpen] = useState<boolean>(false);
  const [policies, setPolicies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  // Fetch policies when the component mounts
  useEffect(() => {
    const loadPolicies = async () => {
      try {
        const data = await fetchPolicies('COMPLETED'); // Fetch policies of type 'completed'
        console.log('Fetched policies:', data.data.records); // Debugging
        setPolicies(data.data.records);
      } catch (error) {
        console.error('Error loading policies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPolicies();
  }, []);

  // Memoized filtered data
  const filteredPolicies = useMemo(() => {
    return policies.map((policy) => ({
      ...policy,
      typeOfInsurance: policy.pets.length > 0 ? policy.pets[0].type : 'N/A', // Add typeOfInsurance field
    })).filter((policy) => {
      // Safely handle null or undefined values
      const fullName = policy.fullName ? policy.fullName.toLowerCase() : '';
      const emailAddress = policy.emailAddress ? policy.emailAddress.toLowerCase() : '';
      const phoneNumber = policy.phoneNumber || '';
      const policyNumber = policy.policyNumber || '';

      const matchesSearchQuery =
        fullName.includes(searchQuery.toLowerCase()) ||
        emailAddress.includes(searchQuery.toLowerCase()) ||
        phoneNumber.includes(searchQuery) ||
        policyNumber.includes(searchQuery);

      const matchesDateRange =
        (!startDate || policy.dateCreated >= startDate) &&
        (!endDate || policy.dateCreated <= endDate);

      return matchesSearchQuery && matchesDateRange;
    });
  }, [policies, searchQuery, startDate, endDate]);

  // Pagination logic
  const totalRows = filteredPolicies.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedPolicies = useMemo(() => filteredPolicies.slice(startIndex, endIndex), [filteredPolicies, startIndex, endIndex]);

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
  const exportToExcel = useCallback(() => {
    const worksheet = XLSX.utils.json_to_sheet(filteredPolicies);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Policies');
    XLSX.writeFile(workbook, 'policies.xlsx');
  }, [filteredPolicies]);

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

  if (loading) {
    return <div>
      <LoadingSpinner/>
    </div>;
  }

  return (
    <div>
      {/* Back button and search bar */}
      <div className="flex justify-start items-center gap-5 mb-5">
        <Link href="/admin/dashboard">
          <IoIosArrowRoundBack size={24} className="text-black" />
        </Link>
        <input
          type="text"
          placeholder="Search by Policy Number, Name, Email, Phone Number, Date Created..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/2 p-2 border border-gray-300 rounded-full bg-transparent"
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
          onClick={() => {}}
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
      <Table data={paginatedPolicies} startIndex={startIndex} columns={columns} onRowClick={handleRowClick} />

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
          data={filteredPolicies}
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
        type='policy'
      />
    </div>
  );
}
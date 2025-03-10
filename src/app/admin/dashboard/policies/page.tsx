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
import apiEndpoints from '@/libs/api-endpoints';
import { API } from '@/libs/api';

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
  const [totalRows, setTotalRows] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  // Fetch policies when the component mounts or filters change
  useEffect(() => {
    const loadPolicies = async () => {
      try {
        setLoading(true);
        const data = await fetchPolicies('COMPLETED', currentPage, rowsPerPage, searchQuery, startDate, endDate);
        setPolicies(data.data.records);
        setTotalRows(data.data.totalRecords);
      } catch (error) {
        console.error('Error loading policies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPolicies();
  }, [currentPage, rowsPerPage, searchQuery, startDate, endDate]);

  // Reset to the first page when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Normalize data for display
  const normalizedPolicies = useMemo(() => {
    return policies.map((policy) => ({
      ...policy,
      typeOfInsurance: policy.pets.length > 0
        ? policy.pets.map((pet: any) => pet.type).join(', ')
        : 'N/A',
    }));
  }, [policies]);

  const totalPages = Math.ceil(totalRows / rowsPerPage);

  // Handle rows per page change
  const handleRowsPerPageChange = useCallback((value: number) => {
    setRowsPerPage(value);
    setCurrentPage(1);
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

   // Function to focus the date input when the wrapper is clicked
   const handleWrapperClick = useCallback((ref: React.RefObject<HTMLInputElement | null>) => {
    if (ref.current) {
      ref.current.focus();
      ref.current.showPicker();
    }
  }, []);

  // Function to export data to Excel
  const exportToExcel = useCallback(async () => {
    try {
      const response = await API.get(apiEndpoints.admin.exportPolicies.replace('{type}', 'COMPLETED'), {
        params: {
          search: searchQuery,
          startDate,
          endDate,
        },
      });
      const data = response.data.data.records;
      const normalizedData = data.map((policy: any) => ({
        ...policy,
        typeOfInsurance: policy.pets.length > 0
          ? policy.pets.map((pet: any) => pet.type).join(', ')
          : 'N/A',
      }));
      const worksheet = XLSX.utils.json_to_sheet(normalizedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Abandoned Policies');
      XLSX.writeFile(workbook, 'abandoned-policies.xlsx');
    } catch (error) {
      throw new Error('Failed to export data');
    }
  }, [searchQuery, startDate, endDate]);

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
    return <div><LoadingSpinner /></div>;
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
          placeholder="Search by Name, Email, Phone Number, Date Created..."
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
      <Table data={normalizedPolicies} startIndex={(currentPage - 1) * rowsPerPage} columns={columns} onRowClick={handleRowClick} />

      {/* Pagination and rows per page dropdown */}
      <Pagination
        rowsPerPage={rowsPerPage}
        totalPages={Math.ceil(totalRows / rowsPerPage)}
        currentPage={currentPage}
        handleRowsPerPageChange={handleRowsPerPageChange}
        goToPage={goToPage}
        generatePageNumbers={generatePageNumbers}
      />

      {/* Export Modal */}
      {isExportModalOpen && (
        <ExportModal
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
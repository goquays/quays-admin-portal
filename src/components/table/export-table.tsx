import { formatDate } from '@/utils/date-formatter';
import React from 'react';

interface ExportTableProps {
  data: any[];
  startIndex: number;
  columns: { key: string; label: string }[];
}

const ExportTable: React.FC<ExportTableProps> = ({ data, startIndex, columns }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <table className="w-full">
      <thead className='rounded-lg'>
        <tr className="bg-[#F0F4FF] text-black font-[Inter] font-semibold">
          <th className="text-left p-2">S/N</th>
          {columns.map((column) => (
            <th key={column.key} className="text-left p-2">
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={row.id} className="hover:bg-gray-50 cursor-pointer">
            <td className="p-4">{startIndex + index + 1}.</td>
            {columns.map((column) => (
              <td key={column.key} className="p-4">
                {column.key === 'dateCreated' || column.key === 'dateRegistered'
                  ? formatDate(row[column.key])
                  : row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ExportTable;
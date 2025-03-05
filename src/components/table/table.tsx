import { formatDate } from '@/utils/date-formatter';
import React from 'react';

interface TableProps {
  data: any[];
  startIndex: number;
  columns: { key: string; label: string }[];
  onRowClick?: (row: any) => void;
}

const Table: React.FC<TableProps> = ({ data, startIndex, columns, onRowClick }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <table className="w-full">
      <thead>
        <tr>
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
          <tr
            key={row.id}
            className="hover:bg-gray-50 cursor-pointer"
            onClick={() => onRowClick?.(row)}
          >
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

export default Table;
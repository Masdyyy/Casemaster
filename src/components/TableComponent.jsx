import React from "react";

const TableComponent = ({ columns, data, onRowClick, rowClassName }) => {
  return (
    <div className="w-full overflow-x-auto px-4 rounded-lg">
      <table className="w-full bg-white rounded-lg overflow-hidden table-fixed">
        <thead>
          <tr className="bg-blue-100 text-left text-[#0F2043] font-medium">
            {columns.map((column) => (
              <th key={column.key} className="py-4 px-6">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              onClick={() => onRowClick && onRowClick(row)}
              className={`p-4 rounded-md hover:bg-gray-200 ${
                rowClassName || ""
              }`}
            >
              {columns.map((column) => (
                <td key={column.key} className="py-3 px-4 text-[#0F2043]">
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;

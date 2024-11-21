import React, { useState, useRef } from "react";

const EditableTableComponent = ({ columns, data, onCellChange }) => {
  const [columnWidths, setColumnWidths] = useState(columns.map(() => 150)); // Default width for each column
  const isResizing = useRef(false);  // Ref to track if a column is being resized
  const startX = useRef(0);  // Ref to track the starting mouse X position
  const startWidth = useRef(0);  // Ref to track the starting column width
  const currentColumnIndex = useRef(null);  // Ref to track the index of the column being resized

  const MAX_WIDTH = 300;  // Max column width
  const MIN_WIDTH = 50;   // Min column width to avoid columns getting too narrow

  const handleMouseDown = (index, event) => {
    isResizing.current = true;
    currentColumnIndex.current = index;  // Track which column is being resized
    startX.current = event.clientX;
    startWidth.current = columnWidths[index];

    // Prevent text selection during resizing
    document.body.style.userSelect = "none";

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event) => {
    if (!isResizing.current) return;

    const diff = (event.clientX - startX.current) * 3;  // Mouse movement difference
    const newWidth = startWidth.current + diff;  // Calculate new column width

    // Ensure the new width stays within the min and max limits
    if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
      const updatedWidths = [...columnWidths];
      updatedWidths[currentColumnIndex.current] = newWidth;
      setColumnWidths(updatedWidths);  // Update the state with new widths
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.body.style.userSelect = "auto";  // Re-enable text selection after resizing
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleChange = (rowIndex, columnKey, event) => {
    const newValue = event.target.value;
    onCellChange(rowIndex, columnKey, newValue);
  };

  return (
    <div className="w-full overflow-x-auto px-4 rounded-lg">
      <table className="min-w-max bg-white rounded-lg table-fixed border border-gray-300">
        <thead>
          <tr className="bg-blue-100 text-left text-[#0F2043] font-medium border-b border-gray-300">
            {columns.map((column, index) => (
              <th
                key={column.key}
                className="py-4 px-6 border-r border-gray-300 relative"  // Added relative to ensure correct positioning
                style={{ width: `${columnWidths[index]}px` }}
              >
                {column.header}
                <div
                  className="absolute top-0 right-0 h-full w-1 cursor-ew-resize"
                  onMouseDown={(e) => handleMouseDown(index, e)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-gray-200 border-b border-gray-300"
            >
              {columns.map((column, index) => (
                <td
                  key={column.key}
                  className="py-3 px-4 text-[#0F2043] border-r border-gray-300"
                  style={{ width: `${columnWidths[index]}px` }}
                >
                  <input
                    type="text"
                    value={row[column.key]}
                    onChange={(event) =>
                      handleChange(rowIndex, column.key, event)
                    }
                    className="bg-transparent w-full border-none outline-none"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTableComponent;

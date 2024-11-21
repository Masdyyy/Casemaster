import React, { useState, useEffect } from "react";
import EditableTableComponent from "../components/EditableTableComponent";
import tableData from "./TableData.json";

const CaseTracker = () => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("case-tracker-data");
    return savedData ? JSON.parse(savedData) : tableData.data;
  });

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Save data to localStorage whenever it changes
    localStorage.setItem("case-tracker-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleCellChange = (rowIndex, columnKey, newValue) => {
    const updatedData = [...data];
    updatedData[rowIndex][columnKey] = newValue;
    setData(updatedData);
  };

  const handleAddRow = () => {
    const newRow = tableData.columns.reduce((acc, column) => {
      acc[column.key] = ""; 
      return acc;
    }, {});
    setData([...data, newRow]);
  };

  return (
    <div className="home px-6 py-4">
      <div className="mb-6">
        <p className="text-gray-500 text-sm">{formattedDate}</p>
        <p className="text-gray-500 text-sm">{formattedTime}</p>
        <h1 className="text-[#0F2043] font-semibold text-2xl border-b-2 border-gray-300 pb-4">
          Case Tracker
        </h1>
      </div>
      
      {/* Wrapper for the EditableTableComponent to prevent the entire CaseTracker from scrolling */}
      <div className="overflow-x-auto">
        <EditableTableComponent
          columns={tableData.columns}
          data={data}
          onCellChange={handleCellChange}
        />
      </div>

      <div className="flex justify-start mt-4">
        <button
          onClick={handleAddRow}
          className="text-gray-500 text-sm font-medium bg-transparent hover:underline"
        >
          + Add New Case
        </button>
      </div>
    </div>
  );
};

export default CaseTracker;

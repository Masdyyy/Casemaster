import React, { useState, useEffect } from "react";
import Details from "../../components/Details";
import tableData from "./TableData.json";
import TableComponent from "../../components/TableComponent";

const FromEmail = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60 * 60 * 24);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const { columns, data } = tableData;

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const handleBack = () => {
    setSelectedRow(null);
  };

  return (
    <div className="p-6 space-y-4 ">
      <h2 className="text-[#0F2043] font-medium">{formattedDate}</h2>
      <h1 className="text-[#0F2043] font-semibold text-2xl border-b-2 border-gray-300 pb-4">
        Logbook - From Email
      </h1>

      <div className="flex">
        <div className="flex-1">
          <TableComponent
            columns={columns}
            data={data}
            onRowClick={handleRowClick}
            rowClassName="cursor-pointer"
          />
        </div>

        {selectedRow && (
          <div className="flex-1 flex flex-col justify-start">
            {/* Details Component */}
            <Details row={selectedRow} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FromEmail;

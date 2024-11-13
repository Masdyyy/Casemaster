// Details.jsx
import React from "react";

const Details = ({ row }) => {
  if (!row) return null;

  return (
    <div className="p-6 border rounded-md border-gray-300">
      <h2 className="text-xl font-semibold mb-2 text-[#0F2043]">Details</h2>
      {Object.keys(row).map((key) => (
        <div key={key} className="mb-1 text-[#0F2043]">
          <strong>{key}:</strong> {row[key]}
        </div>
      ))}
    </div>
  );
};

export default Details;

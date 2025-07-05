import React from "react";

const TableSkeleton = () => {
  const rows = Array.from({ length: 6 });

  return (
    <div className="max-sm:overflow-scroll">
      <table className="min-w-full bg-white border border-gray-200 animate-pulse">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-md leading-normal">
            <th className="py-3 px-6 text-left"></th>
            <th className="py-3 px-6 text-left">Nom</th>
            <th className="py-3 px-6 text-left">Ministère | Administration</th>
            <th className="py-3 px-6 text-left">ROLE</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-[15px] font-light">
          {rows.map((_, i) => (
            <tr key={i} className="border-b border-gray-200">
              <td className="py-3 px-6">
                <div className="h-10 w-10 rounded-full bg-gray-300"></div>
              </td>
              <td className="py-3 px-6">
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
              </td>
              <td className="py-3 px-6">
                <div className="h-4 w-52 bg-gray-300 rounded"></div>
              </td>
              <td className="py-3 px-6">
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
              </td>
              <td className="py-3 px-6 flex gap-2">
                <div className="h-8 w-16 bg-gray-300 rounded"></div>
                <div className="h-8 w-20 bg-gray-300 rounded"></div>
                <div className="h-8 w-20 bg-gray-300 rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;

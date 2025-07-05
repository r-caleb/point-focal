import React from "react";

const StatSkeleton = () => {
  return (
    <div className="px-3.5 flex items-center gap-4 max-sm:flex-col animate-pulse">
      {/* Card 1 */}
      <div className="bg-white w-full p-4 rounded-lg px-8 max-md:px-4">
        <div className="flex items-center justify-between w-full">
          <div>
            <div className="h-4 w-40 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 w-24 bg-gray-300 rounded"></div>
          </div>
          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white w-full p-4 rounded-lg px-8 max-md:px-4">
        <div className="flex items-center justify-between w-full">
          <div>
            <div className="h-4 w-40 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 w-24 bg-gray-300 rounded"></div>
          </div>
          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-white w-full p-4 rounded-lg px-8 max-md:px-4">
        <div className="flex items-center justify-between w-full">
          <div>
            <div className="h-4 w-40 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 w-24 bg-gray-300 rounded"></div>
          </div>
          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default StatSkeleton;

export default function MessageListSkeleton() {
  return (
    <div className="mx-auto w-[90%] px-4 max-md:px-2 max-md:w-full animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between border-b px-8 max-md:px-1 py-4"
        >
          <div className="flex flex-col items-center px-2 w-3/4 max-md:w-full">
            <div className="flex justify-between items-center w-full gap-2">
              <div className="flex items-center gap-3 text-[13px] w-full">
                <div className="bg-gray-300 h-[38px] w-[38px] rounded-full"></div>
                <div className="flex flex-col gap-1 w-full">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
        </div>
      ))}
    </div>
  );
}

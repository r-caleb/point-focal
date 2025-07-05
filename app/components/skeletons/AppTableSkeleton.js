export default function AppTableSkeleton() {
  return (
    <div className="max-md:overflow-scroll animate-pulse">
      <table className="min-w-full bg-white border">
        <thead className="text-md bg-gray-200">
          <tr>
            <th className="border px-4 py-2">NOM</th>
            <th className="border px-4 py-2">TYPE</th>
            <th className="border px-4 py-2">MINISTERE</th>
            <th className="border px-4 py-2">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, index) => (
            <tr key={index} className="border-b">
              <td className="border px-4 py-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </td>
              <td className="border px-4 py-2">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </td>
              <td className="border px-4 py-2">
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </td>
              <td className="border px-4 py-2">
                <div className="flex gap-2">
                  <div className="h-8 w-16 bg-gray-300 rounded"></div>
                  <div className="h-8 w-20 bg-gray-300 rounded"></div>
                  <div className="h-8 w-20 bg-gray-300 rounded"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

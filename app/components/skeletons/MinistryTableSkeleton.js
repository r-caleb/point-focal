const MinistryTableSkeleton = () => {
  const skeletonRows = Array.from({ length: 6 }); // 6 lignes fictives

  return (
    <div className="max-md:overflow-scroll animate-pulse">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="w-full bg-gray-200 text-gray-600 uppercase text-md leading-normal">
            <th className="py-3 px-6 text-left"></th>
            <th className="py-3 px-6 text-left">Nom Complet</th>
            <th className="py-3 px-6 text-left">Nom abrégé</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-[15px] font-light">
          {skeletonRows.map((_, idx) => (
            <tr key={idx} className="border-b border-gray-200">
              <td className="py-3 px-6">
                <div className="h-4 w-4 bg-gray-300 rounded" />
              </td>
              <td className="py-3 px-6 w-96">
                <div className="h-4 w-64 bg-gray-300 rounded" />
              </td>
              <td className="py-3 px-6">
                <div className="h-4 w-32 bg-gray-300 rounded" />
              </td>
              <td className="py-3 px-6 flex gap-2">
                <div className="h-8 w-20 bg-gray-300 rounded" />
                <div className="h-8 w-24 bg-gray-300 rounded" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MinistryTableSkeleton;

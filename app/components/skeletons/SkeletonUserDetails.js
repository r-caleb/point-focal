export default function SkeletonUserDetails() {
  return (
    <div className="bg-white md:fixed p-4 flex flex-col rounded-md w-[350px] animate-pulse">
      {/* Haut : avatar + info de base */}
      <div className="flex items-center my-2 w-full gap-4">
        <div className="h-[130px] w-[130px] rounded-full bg-gray-300"></div>
        <div className="pr-2 space-y-2 w-full">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          <div className="h-3 bg-gray-300 rounded w-2/3"></div>
          <div className="h-3 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>

      {/* Bas : détails */}
      <div className="pb-8 space-y-4">
        <div className="h-4 bg-gray-200 w-24 rounded"></div>

        {/* Ligne 1 */}
        <div className="flex gap-20 max-md:flex-col max-md:gap-2">
          <div className="w-full space-y-1">
            <div className="h-3 w-24 bg-gray-300 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          </div>
          <div className="w-full space-y-1">
            <div className="h-3 w-24 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          </div>
        </div>
        <hr />

        {/* Ligne 2 */}
        <div className="flex gap-20 max-md:flex-col max-md:gap-2">
          <div className="w-full space-y-1">
            <div className="h-3 w-24 bg-gray-300 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          </div>
          <div className="w-full space-y-1">
            <div className="h-3 w-24 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          </div>
        </div>
        <hr />

        {/* Téléphone */}
        <div className="space-y-1">
          <div className="h-3 w-40 bg-gray-300 rounded"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
        </div>
        <hr />

        {/* Email */}
        <div className="space-y-1">
          <div className="h-3 w-20 bg-gray-300 rounded"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
        </div>
        <hr />

        {/* Adresse */}
        <div className="space-y-1">
          <div className="h-3 w-48 bg-gray-300 rounded"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}

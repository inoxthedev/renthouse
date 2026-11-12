const RoomGrid = ({ count = 4, columns }) => {
  return (
    <div className={`grid gap-3.5 ${columns || 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="relative aspect-[3/2] w-full animate-pulse bg-gray-200">
            <div className="absolute left-2 top-2 h-4 w-12 rounded-full bg-gray-300" />
            <div className="absolute right-2 top-2 h-6 w-6 rounded-full bg-gray-300" />
          </div>

          <div className="space-y-2 p-2.5">
            <div className="h-3.5 w-4/5 animate-pulse rounded bg-gray-200" />

            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 shrink-0 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-3/5 animate-pulse rounded bg-gray-200" />
            </div>

            <div className="flex items-center gap-2">
              <div className="h-2.5 w-12 animate-pulse rounded bg-gray-100" />
              <div className="h-2.5 w-14 animate-pulse rounded bg-gray-100" />
            </div>

            <div className="pt-0.5">
              <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomGrid;
const ShimmerBox = () => {
  return (
    <div className="p-6 rounded-lg shadow-md border bg-gray-800 animate-pulse h-[200px] flex flex-col justify-between">
      {/* Name Placeholder */}
      <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>

      {/* Review Text Placeholder */}
      <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-4/6 mb-4"></div>

      {/* Location Placeholder */}
      <div className="h-5 bg-gray-700 rounded w-1/2"></div>
    </div>
  );
};

export default ShimmerBox;

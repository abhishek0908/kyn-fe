import { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import ShimmerBox from "./ShimmerBox";

const ViewReview = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://kyn-be.vercel.app/reviews");
        if (!response.ok) throw new Error("Failed to fetch reviews");
        const data = await response.json();

        const allReviews = Object.values(data).flat();
        if (allReviews.length > 0) {
          setReviews(allReviews);
          setFilteredReviews(allReviews);
        } else {
          setError("No reviews found.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleSearch = (location) => {
    if (!location) {
      setFilteredReviews(reviews);
      return;
    }

    const filtered = reviews.filter((review) =>
      review.location.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredReviews(filtered);
  };

  return (
    <div className={`max-w-6xl mx-auto mt-10 p-6 rounded-xl shadow-lg border border-gray-700 
      ${selectedReview ? "bg-gray-900" : "bg-gray-900"}`}>
      
      <h1 className="text-4xl font-bold text-blue-400 mb-6 text-center">
        User Reviews
      </h1>

      {/* Search Box */}
      <SearchBox onSearch={handleSearch} />

      {error && <p className="text-red-400 text-center mt-4">{error}</p>}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <ShimmerBox key={index} />
          ))}
        </div>
      ) : filteredReviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {filteredReviews.map((review, index) => (
            <div
              key={index}
              className="p-6 rounded-lg shadow-md transition-all duration-300 border bg-gray-800 hover:scale-105 hover:shadow-xl h-[200px] flex flex-col justify-between overflow-hidden cursor-pointer"
              onClick={() => setSelectedReview(review)}
            >
              <h2 className="text-xl font-semibold text-blue-300 truncate">
                {review.name || "Anonymous"}
              </h2>
              <p className="text-gray-300 mt-2 italic text-sm line-clamp-2">
                "{review.text.length > 50 ? review.text.slice(0, 50) + "..." : review.text}"
              </p>
              <p className="text-gray-400 font-medium mt-3 truncate">
                📍 Location:{" "}
                <span className="text-yellow-300">
                  {review.location.length > 20
                    ? review.location.slice(0, 20) + "..."
                    : review.location}
                </span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center mt-6">
          No reviews available for this location.
        </p>
      )}

      {/* Modal for full review */}
     {/* Modal for full review */}
{/* Modal for full review */}
{selectedReview && (
  <div className="fixed inset-0 flex items-center justify-center bg-blue bg-opacity-50 backdrop-blur-sm p-4 animate-fadeIn">
    <div className="bg-gray-900 p-6 rounded-2xl shadow-2xl max-w-lg text-white relative w-full md:w-2/3 lg:w-1/2 border border-gray-700">
      {/* Close Button */}
      <button
        className="absolute top-3 right-3 text-gray-400 hover:text-red-400 text-2xl transition-transform transform hover:scale-110"
        onClick={() => setSelectedReview(null)}
      >
        ✖
      </button>

      {/* Reviewer's Name */}
      <h2 className="text-2xl font-semibold text-blue-400 border-b border-gray-700 pb-2">
        {selectedReview.name || "Anonymous"}
      </h2>

      {/* Review Text */}
      <div className="text-gray-300 mt-4 italic max-h-72 overflow-y-auto p-2 bg-gray-800 rounded-md">
        "{selectedReview.text}"
      </div>

      {/* Review Location */}
      <p className="text-gray-400 font-medium mt-3">
        📍 Location: <span className="text-yellow-300">{selectedReview.location}</span>
      </p>
    </div>
  </div>
)}


    </div>
  );
};

export default ViewReview;

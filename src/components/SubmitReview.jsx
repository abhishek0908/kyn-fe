import { useState } from "react";
import SearchBox from "./SearchBox";

const SubmitReview = () => {
  const [reviewText, setReviewText] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleSearch = (locationName, lat, lng) => {
    console.log("Selected Location:", locationName, lat, lng);
    setSelectedLocation({ name: locationName, lat, lng });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedLocation || !selectedLocation.name) {
      setError("Please select a valid location.");
      return;
    }
    if (!reviewText.trim()) {
      setError("Review text cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const requestBody = {
        text: reviewText,
        location: selectedLocation.name,
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
      };

      console.log("Submitting payload:", JSON.stringify(requestBody)); // Debugging

      const response = await fetch("https://kyn-be.vercel.app/submit-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "User-Agent": "ReactApp", // Optional but useful
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit review.");
      }

      setSuccess("Review submitted successfully!");
      setReviewText("");
      setSelectedLocation(null);
    } catch (err) {
      console.error("Error submitting review:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-20 p-6 bg-gray-900 text-white rounded-xl shadow-lg border border-gray-700">
      <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center">
        Submit a Review
      </h2>

      {/* Search Box for Location */}
      <SearchBox onSearch={handleSearch} />

      {selectedLocation && (
        <p className="text-gray-400 mt-3">
          Selected Location: <span className="text-yellow-300">{selectedLocation.name}</span>
        </p>
      )}

      {/* Review Input Box */}
      <textarea
        className="w-full mt-4 p-3 bg-gray-800 text-white rounded-md border border-gray-700 focus:ring focus:ring-blue-400"
        placeholder="Write your review (max 500 characters)..."
        maxLength={500}
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        rows={5}
      ></textarea>

      {/* Error & Success Messages */}
      {error && <p className="text-red-400 mt-2">{error}</p>}
      {success && <p className="text-green-400 mt-2">{success}</p>}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 transition text-white py-3 rounded-md font-bold"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
};

export default SubmitReview;

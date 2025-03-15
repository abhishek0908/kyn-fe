import { useState } from "react";
import { Search } from "lucide-react";

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`
      );
      const data = await response.json();
      setSuggestions(data.features || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSearch = (place) => {
    if (!place || !place.center) {
      console.error("Invalid place data:", place);
      return;
    }

    const lat = place.center[1]; // Latitude
    const lng = place.center[0]; // Longitude

    setQuery(place.place_name);
    setSuggestions([]);
    onSearch(place.place_name, lat, lng); // Pass lat & lng
  };

  return (
    <div className="relative w-full max-w-lg mx-auto mt-6">
      <div className="flex bg-gray-900 p-3 rounded-lg shadow-lg items-center">
        <input
          type="text"
          placeholder="Enter Location"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            fetchSuggestions(e.target.value);
          }}
          className="flex-1 p-3 bg-gray-800 text-white rounded-l-md outline-none text-lg"
        />
        <button
          onClick={() => {
            if (suggestions.length > 0) {
              handleSearch(suggestions[0]); // Use first suggestion if available
            } else {
              console.warn("No valid location selected");
            }
          }}
          className="bg-gray-700 p-3 rounded-r-md hover:bg-gray-600 transition"
        >
          <Search size={20} color="#fff" />
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-gray-800 text-white rounded-md shadow-lg max-h-64 overflow-y-auto mt-2 z-10">
          {suggestions.map((place) => (
            <li
              key={place.id}
              onClick={() => handleSearch(place)}
              className="p-3 cursor-pointer border-b border-gray-700 hover:bg-gray-700 transition text-lg"
            >
              {place.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;

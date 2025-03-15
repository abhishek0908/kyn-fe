import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Search } from "lucide-react";

const Map = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [0, 0],
      zoom: 2,
    });

    mapRef.current = map;

    const fetchReviews = async () => {
      try {
        const response = await fetch("https://kyn-be.vercel.app/reviews");
        const data = await response.json();
    
        console.log("Fetched Data:", data); // Debugging output
    
        if (!Array.isArray(data)) {
          console.error("Unexpected response format:", data);
          return;
        }
    
        data.forEach(({ lat, lng, text, location }) => {
          if (!lat || !lng || !text || !location) {
            console.warn("Invalid review data:", { lat, lng, text, location });
            return;
          }
    
          // Create person marker
          const markerEl = document.createElement("div");
          markerEl.innerHTML = "👤"; // Person icon
          markerEl.style.fontSize = "24px";
          markerEl.style.cursor = "pointer";
    
          // Create popup with location and review
          const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            offset: 10,
            maxWidth: "none",
          }).setHTML(
            `<div style="background-color: white; color: black; font-size: 14px; padding: 10px; border-radius: 8px; max-width: 300px; word-wrap: break-word; white-space: normal;">
              <strong>Location:</strong> ${location}<br>
              <strong>Review:</strong> ${text}
            </div>`
          );
    
          // Add marker
          const marker = new mapboxgl.Marker(markerEl)
            .setLngLat([lng, lat])
            .addTo(mapRef.current);
    
          // Show popup on hover
          marker.getElement().addEventListener("mouseenter", () => {
            popup.addTo(mapRef.current).setLngLat([lng, lat]);
          });
    
          // Hide popup on mouse leave
          marker.getElement().addEventListener("mouseleave", () => {
            popup.remove();
          });
        });
      } catch (error) {
        console.error("Error fetching review locations:", error);
      }
    };
    

    fetchReviews();
    return () => map.remove();
  }, []);

  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      setSuggestions(data.features || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSearch = async (place) => {
    setQuery(place.place_name);
    setSuggestions([]);

    const [lng, lat] = place.center;
    if (marker) marker.remove();

    const newMarker = new mapboxgl.Marker({ color: "red" })
      .setLngLat([lng, lat])
      .addTo(mapRef.current);

    setMarker(newMarker);
    mapRef.current.flyTo({ center: [lng, lat], zoom: 12 });
  };

  return (
    <>
      <div ref={mapContainerRef} className="w-screen h-screen" />

      {/* Search Box */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-40 bg-gray-900 p-3 rounded-lg shadow-lg flex items-center w-11/12 max-w-lg">
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
          onClick={() =>
            query && handleSearch({ place_name: query, center: [0, 0] })
          }
          className="bg-gray-700 p-3 rounded-r-md hover:bg-gray-600 transition"
        >
          <Search size={20} color="#fff" />
        </button>
      </div>

      {/* Suggestions Box */}
      {suggestions.length > 0 && (
        <ul className="absolute top-40 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white rounded-md shadow-lg max-h-64 overflow-y-auto w-11/12 max-w-lg">
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
    </>
  );
};

export default Map;
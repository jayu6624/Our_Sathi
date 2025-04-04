import React, { useState, useEffect } from "react";
import { LocateFixed, Loader } from "lucide-react";
import axios from "axios";

function LocationSearch({
  setVehicle,
  setIsExpanded,
  onLocationSelect,
  inputValue,
  activeInput,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch suggestions when input value changes
  useEffect(() => {
    // Don't make API call if input is less than 3 characters
    if (!inputValue || inputValue.length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get token directly from localStorage
        let token = localStorage.getItem("token");

        // Remove any surrounding quotes from the token if present
        if (token && (token.startsWith('"') || token.startsWith("'"))) {
          token = token.replace(/^["']|["']$/g, "");
        }

        console.log(
          "Token being used:",
          token ? `${token.substring(0, 10)}...` : "No token"
        );

        if (!token) {
          console.error("No token found in localStorage");
          setError("Authentication required. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:4000/maps/get-suggestions?input=${encodeURIComponent(
            inputValue
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("API Response:", response.data);
        setSuggestions(response.data);
      } catch (err) {
        console.error("Error fetching suggestions:", err);

        // Log detailed error information
        if (err.response) {
          console.error("Response status:", err.response.status);
          console.error("Response data:", err.response.data);
        }

        if (err.response && err.response.status === 401) {
          setError("Authentication failed. Please log in again.");
          // Optionally redirect to login page
          // window.location.href = "/login";
        } else {
          setError("Failed to load suggestions. Please try again.");
        }

        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce API calls
    const timeoutId = setTimeout(() => {
      fetchSuggestions();
    }, 300); // 300ms delay

    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  // Enhanced location click handler with better mobile support
  const handleLocationClick = (location) => {
    console.log(`Location clicked: ${location}`);

    // Call the function passed from parent to update input value
    if (onLocationSelect) {
      onLocationSelect(location);
    }

    // Set vehicle if needed
    if (setVehicle) {
      setVehicle(true);
    }

    // Set expanded if needed
    if (setIsExpanded) {
      setIsExpanded(true);
    }
  };

  return (
    <div className="p-3 border-t border-gray-100">
      {loading && (
        <div className="flex items-center justify-center p-4">
          <Loader size={24} className="animate-spin text-gray-600 mr-2" />
          <span>Loading suggestions...</span>
        </div>
      )}

      {error && <div className="p-4 text-red-500 text-center">{error}</div>}

      {!loading &&
        suggestions.length === 0 &&
        inputValue &&
        inputValue.length >= 3 && (
          <div className="p-4 text-gray-500 text-center">
            No locations found. Try a different search.
          </div>
        )}

      {!loading &&
        suggestions.length > 0 &&
        suggestions.map((location, index) => (
          <div
            key={index}
            className="flex items-center p-3 hover:bg-gray-100 rounded cursor-pointer transition-colors mb-2 active:bg-gray-200"
            onClick={() => handleLocationClick(location)}
            onTouchEnd={(e) => {
              e.preventDefault(); // Prevent default to avoid double-firing
              handleLocationClick(location);
            }}
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <LocateFixed size={18} />
            </div>
            <div className="text-sm text-gray-800 text-left line-clamp-2">
              {location}
            </div>
          </div>
        ))}

      {/* Show minimum characters message if input is too short */}
      {inputValue && inputValue.length < 3 && (
        <div className="p-4 text-gray-500 text-center">
          Please enter at least 3 characters to search
        </div>
      )}
    </div>
  );
}

export default LocationSearch;

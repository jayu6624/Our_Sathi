import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  MapPin,
  ArrowRightCircle,
  Menu,
  X,
  User,
  Clock,
  Settings,
  LogOut,
  Home,
  Briefcase,
  Locate,
  Info,
  ChevronDown,
} from "lucide-react";
import "../CSS/Start.css";
import LocationSearch from "../Components/LocationSearch";
import VehiclePannel from "../Components/VehiclePannel";
import ConfirmRide from "../Components/ConfirmRide";
import Ride_navbar from "../Components/Ride_navbar";
import Ridepannel from "../Components/Ridepannel";

function Start() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [ridepannel, setridepannel] = useState(false);
  const [confirmRidePannel, setConfirmRidePannel] = useState(false);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [activeInput, setActiveInput] = useState(null); // 'pickup' or 'destination'
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [vehicle, setVehicle] = useState(false);
  const [vehicletype, setVehicletype] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState("trip"); // 'trip', 'vehicle', or 'confirm'
  const [isProfileOpen, setIsProfileOpen] = useState(false); // New state for profile dropdown
  const [profileData, setProfileData] = useState(null); // State for profile data
  const [fareData, setFareData] = useState(null);
  const [showLocationInfo, setShowLocationInfo] = useState(false); // State for showing location help info

  // Refs for inputs
  const pickupInputRef = useRef(null);
  const destinationInputRef = useRef(null);

  // Add this new state to track geolocation status
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);

  // Add this state for location permission tracking
  const [locationPermissionStatus, setLocationPermissionStatus] =
    useState("unknown"); // "unknown", "granted", "denied", "prompt"

  // Create a geocoding cache to reduce API calls
  const [geocodingCache, setGeocodingCache] = useState({});

  // Handle input focus/click for location search
  const handleInputFocus = (inputType) => {
    setActiveInput(inputType);
    setShowLocationSearch(true);
  };

  // Updated profile function to fetch and store user data
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(
        "Token for profile fetch:",
        token ? "Token exists" : "No token"
      );

      if (!token) {
        console.error("No token found in localStorage");
        // Redirect to login if no token is found
        window.location.href = "/login";
        return;
      }

      // Remove any surrounding quotes from the token if present
      const cleanToken =
        token.startsWith('"') || token.startsWith("'")
          ? token.replace(/^["']|["']$/g, "")
          : token;

      const response = await axios.get(
        "http://localhost:4000/users/getprofile",
        {
          headers: {
            Authorization: `Bearer ${cleanToken}`,
          },
        }
      );
      console.log("Profile API response:", response.data);
      setProfileData(response.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);

      // Log detailed error information
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
      }

      // Check if it's an authentication error
      if (error.response && error.response.status === 401) {
        console.error(
          "Authentication failed. Token may be invalid or expired."
        );
        // Redirect to login page if token is invalid
        localStorage.removeItem("token"); // Clear invalid token
        window.location.href = "/login";
      }
    }
  };

  // Fetch profile data when component mounts
  useEffect(() => {
    fetchProfile();
  }, []);

  // Check for geolocation permission status on component mount
  useEffect(() => {
    checkLocationPermission();
  }, []);

  // Function to check current location permission status
  const checkLocationPermission = () => {
    if (!navigator.permissions || !navigator.geolocation) {
      setLocationPermissionStatus("unsupported");
      return;
    }

    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        console.log("Geolocation permission status:", permissionStatus.state);
        setLocationPermissionStatus(permissionStatus.state);

        // Set up a listener for permission changes
        permissionStatus.onchange = () => {
          console.log(
            "Geolocation permission changed to:",
            permissionStatus.state
          );
          setLocationPermissionStatus(permissionStatus.state);
        };
      })
      .catch((error) => {
        console.error("Error checking geolocation permission:", error);
        setLocationPermissionStatus("unknown");
      });
  };

  // Helper function to format coordinates in a more readable way
  const formatCoordinates = (lat, lng) => {
    // Round to 4 decimal places (roughly 11 meters precision)
    const roundedLat = parseFloat(lat).toFixed(4);
    const roundedLng = parseFloat(lng).toFixed(4);

    // Try to determine hemisphere for more human readability
    const latDirection = roundedLat >= 0 ? "N" : "S";
    const lngDirection = roundedLng >= 0 ? "E" : "W";

    // Format as degrees with direction
    return `${Math.abs(roundedLat)}° ${latDirection}, ${Math.abs(
      roundedLng
    )}° ${lngDirection}`;
  };

  // Extract readable location from coordinates when geocoding fails
  const getBasicLocationFromCoordinates = async (lat, lng) => {
    try {
      // Try to fetch country/city information from a free API as fallback
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&zoom=10`
      );

      if (response.data && response.data.display_name) {
        const parts = response.data.display_name.split(",");
        // Take only the last 2-3 parts (usually city, state, country)
        const simplifiedLocation = parts
          .slice(Math.max(0, parts.length - 3))
          .join(", ");
        return `Near ${simplifiedLocation}`;
      }
    } catch (error) {
      console.error("Fallback geocoding failed:", error);
    }

    // If all fails, return formatted coordinates
    return formatCoordinates(lat, lng);
  };

  // Function to fetch address from coordinates with timeout, retry and caching
  const getAddressFromCoordinates = async (lat, lng, token, retryCount = 0) => {
    const MAX_RETRIES = 2;
    const TIMEOUT_MS = 8000; // 8 seconds

    // Create a cache key
    const cacheKey = `${lat},${lng}`;

    // Check if we have this location in cache
    if (geocodingCache[cacheKey]) {
      console.log("Using cached location address:", geocodingCache[cacheKey]);
      return geocodingCache[cacheKey];
    }

    try {
      // Create a promise that rejects after timeout
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(
          () => reject(new Error("Reverse geocoding request timed out")),
          TIMEOUT_MS
        );
      });

      // Create the actual request promise
      const fetchPromise = axios.get(
        `http://localhost:4000/maps/reverse-geocode?lat=${lat}&lng=${lng}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Race between the timeout and the actual request
      const response = await Promise.race([fetchPromise, timeoutPromise]);

      if (response.data && response.data.length > 0) {
        console.log("Reverse geocoding successful:", response.data);
        const address = response.data[0]; // Get the first (best) result

        // Update the cache
        setGeocodingCache((prevCache) => ({
          ...prevCache,
          [cacheKey]: address,
        }));

        return address;
      }

      throw new Error("No address results found");
    } catch (error) {
      console.error(
        `Reverse geocoding attempt ${retryCount + 1} failed:`,
        error
      );

      // Retry logic if we haven't exceeded max retries
      if (retryCount < MAX_RETRIES) {
        console.log(
          `Retrying reverse geocoding (attempt ${retryCount + 2})...`
        );
        // Wait a bit before retrying (increasing backoff)
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * (retryCount + 1))
        );
        return getAddressFromCoordinates(lat, lng, token, retryCount + 1);
      }

      // If we've exceeded max retries, try the fallback
      console.log("All geocoding attempts failed, trying fallback...");
      return getBasicLocationFromCoordinates(lat, lng);
    }
  };

  // Updated function to get current location with better precision and error handling
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setLocationPermissionStatus("unsupported");
      return;
    }

    setIsGettingLocation(true);
    setLocationError(null);

    // Show brief loading message in the pickup input
    setPickup("Getting your location...");

    // Options for high accuracy location
    const geoOptions = {
      enableHighAccuracy: true, // Use GPS if available
      timeout: 15000, // Wait up to 15 seconds
      maximumAge: 0, // Don't use cached position
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          console.log("Location obtained:", position.coords);
          setLocationPermissionStatus("granted");

          // Extract coordinates with proper precision
          const lat = position.coords.latitude.toFixed(6);
          const lng = position.coords.longitude.toFixed(6);

          console.log(`Precise coordinates: ${lat}, ${lng}`);

          // Temporarily show coordinates while fetching address
          const tempLocation = formatCoordinates(lat, lng);
          setPickup(`Getting address near ${tempLocation}...`);

          // Get token from localStorage
          let token = localStorage.getItem("token");
          if (token && (token.startsWith('"') || token.startsWith("'"))) {
            token = token.replace(/^["']|["']$/g, "");
          }

          try {
            // Use the function with retry and fallback logic
            const address = await getAddressFromCoordinates(lat, lng, token);
            console.log("Final address result:", address);

            // If the address appears to be just coordinates, show a nicer message
            if (
              address.includes("°") ||
              (address.includes(",") && /\d+\.\d+/.test(address))
            ) {
              setLocationError(
                "Couldn't get street address - using approximate location"
              );
            } else {
              // Clear any previous location errors if we successfully got an address
              setLocationError(null);
            }

            setPickup(address);
          } catch (geocodeError) {
            console.error("All geocoding methods failed:", geocodeError);
            // Fall back to coordinate format if all geocoding fails
            const formattedCoords = formatCoordinates(lat, lng);
            setPickup(formattedCoords);
            setLocationError(
              "Couldn't determine exact address - using coordinates"
            );
          }

          setIsGettingLocation(false);
        } catch (error) {
          console.error("Error processing location:", error);
          setLocationError("Failed to process your location");
          setIsGettingLocation(false);
          // Reset pickup if it was set to loading message
          if (pickup.includes("Getting")) {
            setPickup("");
          }
        }
      },
      (error) => {
        setIsGettingLocation(false);
        console.error("Geolocation error:", error);

        // Reset pickup if it was set to loading message
        if (pickup.includes("Getting")) {
          setPickup("");
        }

        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationPermissionStatus("denied");
            setLocationError(
              "Location access was denied. Please enable location services to use this feature."
            );
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError(
              "Location information is unavailable. Please try again or enter your location manually."
            );
            break;
          case error.TIMEOUT:
            setLocationError(
              "Location request timed out. Please check your connection and try again."
            );
            break;
          default:
            setLocationError(
              "An unknown error occurred while getting your location. Please try again."
            );
            break;
        }
      },
      geoOptions
    );
  };

  // Enhanced location selection handler for better mobile support
  const handleLocationSelect = (location) => {
    console.log(`Setting location: ${location} for input: ${activeInput}`);

    if (activeInput === "pickup") {
      setPickup(location);
      // Focus destination after selecting pickup location
      setTimeout(() => {
        if (destinationInputRef.current) {
          destinationInputRef.current.focus();
        }
      }, 100);
    } else if (activeInput === "destination") {
      setDestination(location);
    }

    setShowLocationSearch(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (showLocationSearch) {
      setShowLocationSearch(false);
    }
  };

  // Handle input change
  const handleInputChange = (e, type) => {
    if (type === "pickup") {
      setPickup(e.target.value);
    } else {
      setDestination(e.target.value);
    }
  };

  // Close location search when clicking outside
  const handleBackdropClick = () => {
    setShowLocationSearch(false);
  };

  // Get current input value based on active input
  const getCurrentInputValue = () => {
    return activeInput === "pickup" ? pickup : destination;
  };

  // Handle transition from trip form to vehicle panel
  const handleTripFormConfirm = () => {
    // Check if pickup and destination are not empty
    if (pickup && destination) {
      handlefare(pickup, destination);
      setCurrentView("vehicle");
      setridepannel(true);
    } else {
      // Add some feedback for the user - optional
      alert("Please enter both pickup and destination locations");
    }
  };

  // Handle back navigation from vehicle panel to trip form
  const handleBackFromVehicle = () => {
    setCurrentView("trip");
    setridepannel(false);
  };

  // Handle vehicle selection to go to confirm ride panel
  const handleVehicleSelect = () => {
    setCurrentView("confirm");
    setConfirmRidePannel(true);
    setridepannel(false);
  };

  const handlefare = async (pickup, destination) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/rides/getfare?pickup=${pickup}&destination=${destination}`
      );
      console.log("Fare data received:", response.data);
      setFareData(response.data.fare);
    } catch (err) {
      console.log("Error getting fare: " + err);
      // Set default values in case of error
      setFareData({ auto: 0, car: 0, motorcycle: 0 });
    }
  };

  // Handle back navigation from confirm to vehicle panel
  const handleBackFromConfirm = () => {
    setCurrentView("vehicle");
    setConfirmRidePannel(false);
    setridepannel(true);
  };

  // Toggle profile dropdown
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found for logout");
        return;
      }

      await axios.post(
        "http://localhost:4000/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear local storage
      localStorage.removeItem("token");

      // Redirect to login page
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest(".profile-container")) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  // Updated createride function with better error handling and logging
  async function createride(vehicletype) {
    console.log("Creating ride with:", {
      pickup,
      destination,
      vehicleType: vehicletype,
    });

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found for creating ride");
        return;
      }

      // Remove any surrounding quotes from the token if present
      const cleanToken =
        token.startsWith('"') || token.startsWith("'")
          ? token.replace(/^["']|["']$/g, "")
          : token;

      const response = await axios.post(
        "http://localhost:4000/rides/create",
        {
          pickup,
          destination,
          vehicletype: vehicletype,
          fare:
            vehicletype === "car"
              ? fareData.car
              : vehicletype === "auto"
              ? fareData.auto
              : fareData.motorcycle,
        },
        {
          headers: {
            Authorization: `Bearer ${cleanToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Ride created successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating ride:", error);

      // Log detailed error information
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
      }

      // Alert user that something went wrong
      alert("Failed to create ride. Please try again.");
    }
  }

  // Function to show permission explanation when needed
  const handleLocationButtonClick = () => {
    if (locationPermissionStatus === "denied") {
      // Show instructions for enabling location in browser settings
      alert(
        "Location permission is blocked. Please enable location access in your browser settings to use this feature."
      );
    } else {
      // Request location access
      getCurrentLocation();
    }
  };

  // Location Info Panel Component with browser-specific instructions
  const LocationInfoPanel = () => (
    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-sm mt-2">
      <div className="flex justify-between items-start">
        <div className="flex items-center text-blue-800 font-semibold mb-1">
          <Info size={16} className="mr-1 flex-shrink-0" />
          <span>How to enable location access</span>
        </div>
        <button
          onClick={() => setShowLocationInfo(false)}
          className="text-blue-800 hover:bg-blue-100 rounded-full p-1"
        >
          <X size={16} />
        </button>
      </div>

      <div className="text-xs text-gray-700 space-y-2">
        <div>
          <p className="font-medium">Chrome:</p>
          <p>Settings → Privacy and Security → Site Settings → Location</p>
        </div>

        <div>
          <p className="font-medium">Firefox:</p>
          <p>Settings → Privacy & Security → Permissions → Location</p>
        </div>

        <div>
          <p className="font-medium">Safari:</p>
          <p>Preferences → Websites → Location</p>
        </div>

        <div>
          <p className="font-medium">Mobile devices:</p>
          <p>
            Check your device settings to ensure location is enabled for your
            browser
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      {/* Mobile Menu Toggle - Only visible on small screens */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white z-30 relative">
        <div className="flex items-center space-x-2">
          <img src="" alt="Logo" className="h-8" />
          <h2 className="text-lg font-semibold">Ride Service</h2>
        </div>
        <div className="flex items-center space-x-3">
          <div className="profile-container relative">
            <div
              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
              onClick={toggleProfile}
            >
              <User size={18} className="text-gray-600" />
            </div>

            {/* Mobile Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  {profileData ? (
                    <>
                      <p className="text-sm font-medium">
                        {profileData.firstname} {profileData.lastname}
                      </p>
                      <p className="text-xs text-gray-500">
                        {profileData.email}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm">Loading profile...</p>
                  )}
                </div>
                <ul>
                  <li className="hover:bg-gray-50">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 flex items-center"
                    >
                      <User size={16} className="mr-2" />
                      My Profile
                    </a>
                  </li>
                  <li className="hover:bg-gray-50">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 flex items-center"
                    >
                      <Clock size={16} className="mr-2" />
                      Trip History
                    </a>
                  </li>
                  <li className="hover:bg-gray-50">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 flex items-center"
                    >
                      <Settings size={16} className="mr-2" />
                      Settings
                    </a>
                  </li>
                  <li className="border-t border-gray-100 hover:bg-gray-50">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-red-600 flex items-center"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Left Section (1 part) - transforms to full width dropdown on mobile */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:block w-full md:w-1/4 h-auto md:h-full bg-gray-50 border-r border-gray-200 overflow-y-auto transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "absolute top-16 left-0 z-20" : ""
        }`}
      >
        <div className="p-4 md:p-6">
          <h1 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
            Navigation
          </h1>

          {/* Main container - Shows different views based on current state */}
          <div className="bg-white rounded-xl shadow-md p-4 md:p-5 mb-4 md:mb-6 relative">
            {currentView === "confirm" ? (
              /* Confirm Ride Panel */
              <ConfirmRide
                backtovehicle={handleBackFromConfirm}
                pickup={pickup}
                destination={destination}
                vehicletype={vehicletype}
                fareData={fareData}
                createride={createride}
              />
            ) : currentView === "vehicle" ? (
              /* Vehicle Panel */
              <VehiclePannel
                onBackToForm={handleBackFromVehicle}
                onVehicleSelect={handleVehicleSelect}
                setConfirmRidePannel={setConfirmRidePannel}
                setVehicletype={setVehicletype}
                fareData={fareData}
              />
            ) : (
              /* Trip Form - Default view */
              <>
                <h2 className="text-lg md:text-xl font-semibold text-center mb-3 md:mb-4">
                  Find your trip
                </h2>

                <div className="relative z-0">
                  {/* Pick-up input */}
                  <div className="relative mb-3 md:mb-4">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 w-5 h-5" />
                    <input
                      ref={pickupInputRef}
                      type="text"
                      placeholder="Add a pick-up point"
                      value={pickup}
                      onChange={(e) => handleInputChange(e, "pickup")}
                      onFocus={() => handleInputFocus("pickup")}
                      className={`w-full bg-gray-100 border-2 border-gray-300 rounded-lg py-2 pl-10 h-10 md:h-12 ${
                        isGettingLocation ? "animate-pulse border-blue-300" : ""
                      }`}
                      disabled={isGettingLocation}
                    />
                    <button
                      type="button"
                      onClick={handleLocationButtonClick}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full
                        ${
                          isGettingLocation
                            ? "text-blue-500"
                            : locationPermissionStatus === "denied"
                            ? "text-red-500 hover:bg-red-100"
                            : locationPermissionStatus === "granted"
                            ? "text-green-600 hover:bg-green-100"
                            : "text-gray-700 hover:bg-gray-200"
                        }`}
                      title={
                        isGettingLocation
                          ? "Getting your location..."
                          : locationPermissionStatus === "denied"
                          ? "Location access denied. Click to enable."
                          : "Use current location"
                      }
                      disabled={isGettingLocation}
                    >
                      <Locate
                        size={18}
                        className={isGettingLocation ? "animate-spin" : ""}
                      />
                    </button>
                  </div>

                  {/* Location getting status */}
                  {isGettingLocation && (
                    <div className="text-blue-600 text-xs mb-2 bg-blue-50 p-2 rounded-md flex items-center">
                      <div className="animate-spin h-3 w-3 border-2 border-blue-500 rounded-full border-t-transparent mr-2"></div>
                      <span>Detecting your precise location...</span>
                    </div>
                  )}

                  {/* Display location permission status */}
                  {locationPermissionStatus === "denied" &&
                    !isGettingLocation && (
                      <div className="text-red-500 text-xs mb-2 bg-red-50 p-2 rounded-md">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="font-semibold">
                              Location access denied:
                            </span>
                            <span className="ml-1">
                              Enable location in your browser settings.
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              setShowLocationInfo(!showLocationInfo)
                            }
                            className="text-blue-600 hover:text-blue-800 ml-2 flex items-center"
                            title="Show help"
                          >
                            <Info size={14} />
                            <ChevronDown
                              size={14}
                              className={`transition-transform ${
                                showLocationInfo ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        </div>

                        {/* Location Info Panel */}
                        {showLocationInfo && <LocationInfoPanel />}
                      </div>
                    )}

                  {/* Display location error if any */}
                  {locationError &&
                    locationPermissionStatus !== "denied" &&
                    !isGettingLocation && (
                      <div className="text-red-500 text-xs mb-2 bg-red-50 p-2 rounded-md">
                        {locationError}
                      </div>
                    )}

                  {/* Permission Request Modal - Show when permission status is prompt or unknown */}
                  {(locationPermissionStatus === "prompt" ||
                    locationPermissionStatus === "unknown") &&
                    isGettingLocation && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
                          <h2 className="text-lg font-semibold mb-2">
                            Location Access Required
                          </h2>
                          <p className="mb-4 text-sm text-gray-600">
                            To use your current location as pickup point, please
                            allow location access when prompted by your browser.
                          </p>
                          <div className="flex justify-end">
                            <button
                              onClick={() => setIsGettingLocation(false)}
                              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg mr-2"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                  {/* Destination input */}
                  <div className="relative mb-3 md:mb-4">
                    <ArrowRightCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 w-5 h-5" />
                    <input
                      ref={destinationInputRef}
                      type="text"
                      placeholder="Enter your destination"
                      value={destination}
                      onChange={(e) => handleInputChange(e, "destination")}
                      onFocus={() => handleInputFocus("destination")}
                      className="w-full bg-gray-100 border-2 border-gray-300 rounded-lg py-2 pl-10 h-10 md:h-12"
                    />
                  </div>

                  <button
                    className="bg-black text-white rounded-lg py-2 md:py-3 px-4 md:px-6 w-full font-medium"
                    onClick={handleTripFormConfirm}
                  >
                    Confirm
                  </button>
                </div>

                {/* Location search overlay */}
                {showLocationSearch && (
                  <div
                    className={`absolute ${
                      activeInput === "pickup"
                        ? "top-[calc(2.5rem+2.5rem)]"
                        : "top-[calc(2.5rem+2.5rem+3.5rem)]"
                    } left-0 right-0 bg-white rounded-lg shadow-lg z-50 max-h-[300px] overflow-y-auto`}
                  >
                    <LocationSearch
                      setVehicle={setVehicle}
                      setIsExpanded={setIsExpanded}
                      onLocationSelect={handleLocationSelect}
                      inputValue={getCurrentInputValue()}
                      activeInput={activeInput}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Recent Locations - Only show when in trip form view */}
          {currentView === "trip" && (
            <div className="bg-white rounded-xl shadow-md p-4 md:p-5">
              <h3 className="text-base md:text-lg font-medium mb-3 md:mb-4">
                Recent Locations
              </h3>
              <ul className="space-y-2 md:space-y-3">
                <li className="p-2 md:p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  Home
                </li>
                <li className="p-2 md:p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  Work
                </li>
                <li className="p-2 md:p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  Airport
                </li>
              </ul>
            </div>
          )}

          {/* Close button for mobile view */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden mt-4 w-full py-2 bg-gray-200 rounded-lg text-gray-700"
          >
            Close Menu
          </button>
        </div>
      </div>

      {/* Right Section (3 parts) */}
      <div className="w-full md:w-3/4 h-full bg-white overflow-y-auto">
        {/* Top navigation bar - hidden on mobile since we have the mobile menu */}
        <div className="hidden md:flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <img
              src="https://drive.google.com/file/d/1XZRAyL5jmJaT5NctVUjtOqct3uv73Ocq/view?usp=sharing"
              alt="Logo"
              className="h-8"
            />
            <h2 className="text-xl font-semibold">Ride Service</h2>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-sm bg-gray-100 rounded-full">
              Help
            </button>

            {/* Desktop Profile Container */}
            <div className="profile-container relative">
              <div
                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
                onClick={toggleProfile}
              >
                <User size={18} className="text-gray-600" />
              </div>

              {/* Desktop Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    {profileData ? (
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <User size={24} className="text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {profileData.firstname} {profileData.lastname}
                          </p>
                          <p className="text-xs text-gray-500">
                            {profileData.email}
                          </p>
                          <p className="text-xs text-gray-500">
                            {profileData.phonenumber}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p>Loading profile data...</p>
                    )}
                  </div>

                  <div className="px-4 py-2">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-2">
                      Saved Places
                    </p>
                    <ul className="space-y-1">
                      <li className="hover:bg-gray-50 rounded-md">
                        <a
                          href="#"
                          className="block px-2 py-1 text-sm text-gray-700 flex items-center"
                        >
                          <Home size={16} className="mr-2 text-gray-500" />
                          Home
                        </a>
                      </li>
                      <li className="hover:bg-gray-50 rounded-md">
                        <a
                          href="#"
                          className="block px-2 py-1 text-sm text-gray-700 flex items-center"
                        >
                          <Briefcase size={16} className="mr-2 text-gray-500" />
                          Work
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <ul>
                      <li className="hover:bg-gray-50">
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 flex items-center"
                        >
                          <User size={16} className="mr-2" />
                          My Profile
                        </a>
                      </li>
                      <li className="hover:bg-gray-50">
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 flex items-center"
                        >
                          <Clock size={16} className="mr-2" />
                          Trip History
                        </a>
                      </li>
                      <li className="hover:bg-gray-50">
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 flex items-center"
                        >
                          <Settings size={16} className="mr-2" />
                          Settings
                        </a>
                      </li>
                      <li className="border-t border-gray-100 hover:bg-gray-50">
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-red-600 flex items-center"
                          onClick={handleLogout}
                        >
                          <LogOut size={16} className="mr-2" />
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main content area (map) */}
        <div className="p-3 md:p-6 h-[calc(100%-64px)] md:h-[calc(100%-64px)]">
          <img
            className="bg-cover w-full h-full"
            src="https://s.wsj.net/public/resources/images/BN-XR453_201802_M_20180228165619.gif"
            alt=""
          />
        </div>

        {/* Profile Summary Card - Only visible when profile data is loaded */}
      </div>

      {/* Backdrop when search is open */}
      {showLocationSearch && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={handleBackdropClick}
        />
      )}

      {/* Backdrop when profile is open on mobile */}
      {isProfileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-10 z-40"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </div>
  );
}

export default Start;

const axios = require("axios");

module.exports.getAddressCoordinates = async (address) => {
  try {
    const apiKey = process.env.GOMAPS_API_KEY;
    const encodedAddress = encodeURIComponent(address);
    console.log(`Encoded Address: ${encodedAddress}`);

    const response = await axios.get(
      `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`
    );

    console.log(`Geocoding Status: ${response.status}`);

    if (response.status === 200 && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error("Failed to geocode address");
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    throw error;
  }
};

module.exports.getDistTime = async (origin, destination) => {
  try {
    if (!origin || !destination) {
      throw new Error("Origin and destination are required.");
    }

    const apiKey = process.env.GOMAPS_API_KEY;

    const url = `https://maps.gomaps.pro/maps/api/directions/json?destination=${destination}&origin=${origin}&key=${apiKey}`;
    //https://maps.gomaps.pro/maps/api/directions/json?destination=gondal&origin=rajkot&key=AlzaSya7EwujDMLTzMYtb1Rs1FEMG1jAY2nvOvh

    const response = await axios.get(url);

    if (
      response.status === 200 &&
      response.data.routes.length > 0 &&
      response.data.routes[0].legs.length > 0
    ) {
      const leg = response.data.routes[0].legs[0];

      return {
        distance_km: (leg.distance.value / 1000).toFixed(2),
        duration_min: (leg.duration.value / 60).toFixed(2),
      };
    } else {
      throw new Error("Failed to fetch distance and time.");
    }
  } catch (error) {
    console.error("Error fetching distance and time:", error);
    throw error;
  }
};

module.exports.getAutocompletesuggestion = async (input) => {
  if (!input) {
    throw new Error("Query is required");
  }
  const apiKey = process.env.GOMAPS_API_KEY;

  const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    // Log response data to debug
    console.log("API Response:", response.data);

    if (
      response.status === 200 &&
      response.data.predictions &&
      response.data.predictions.length > 0
    ) {
      return response.data.predictions.map(
        (prediction) => prediction.description
      );
    } else {
      throw new Error("No autocomplete suggestions found.");
    }
  } catch (error) {
    console.error(
      "Autocomplete error:",
      error.response ? error.response.data : error
    );
    throw error;
  }
};

// Add new method for reverse geocoding with improved accuracy
module.exports.reverseGeocode = async (lat, lng) => {
  try {
    if (!lat || !lng) {
      throw new Error("Latitude and longitude are required.");
    }

    // Validate coordinates
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    if (isNaN(latitude) || isNaN(longitude)) {
      throw new Error("Invalid latitude or longitude values");
    }

    if (
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      throw new Error("Coordinates out of valid range");
    }

    const apiKey = process.env.GOMAPS_API_KEY;
    // Add result_type parameter to get more precise addresses
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}&result_type=street_address|route|locality|neighborhood|premise`;

    console.log(`Requesting reverse geocoding for: ${latitude}, ${longitude}`);
    const response = await axios.get(url);

    console.log(`Reverse Geocoding Status: ${response.status}`);

    if (
      response.status === 200 &&
      response.data.results &&
      response.data.results.length > 0
    ) {
      // Process results to get better formatted addresses
      const processedResults = response.data.results.map((result) => {
        // Log full result structure for debugging
        console.log(
          "Geocoding result component types:",
          result.address_components
            ? result.address_components.map((comp) => comp.types.join(", "))
            : "No components"
        );

        return result.formatted_address;
      });

      // Filter out duplicates and limit to 3 results
      const uniqueResults = [...new Set(processedResults)];

      // If we have a specific address, prioritize it
      const streetAddressResults = response.data.results.filter(
        (result) =>
          result.types &&
          (result.types.includes("street_address") ||
            result.types.includes("premise") ||
            result.types.includes("route"))
      );

      if (streetAddressResults.length > 0) {
        // Prioritize specific street addresses
        const specificResults = streetAddressResults.map(
          (result) => result.formatted_address
        );
        const otherResults = uniqueResults.filter(
          (addr) => !specificResults.includes(addr)
        );
        return [...specificResults, ...otherResults].slice(0, 3);
      }

      return uniqueResults.slice(0, 3);
    } else {
      console.warn("No results from reverse geocoding API:", response.data);
      throw new Error("Failed to get address from coordinates");
    }
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    // Provide more helpful error message to client
    if (error.response) {
      console.error("API Error Response:", error.response.data);
    }
    throw error;
  }
};

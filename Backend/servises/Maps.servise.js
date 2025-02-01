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

const axios = require('axios');

module.exports.getAddressCorrdinates = async (address) => {
  try {
    const apiKey = process.env.GGOOGLE_MAP_KEY;
    const encodedAddress = encodeURIComponent(address);
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`
    );

    if (response.data.status === "OK") {
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

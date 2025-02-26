const rideModel = require("../models/ride.model");
const mapservice = require("../servises/Maps.servise");
const crypto = require('crypto')
async function getfare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("pickup and destination is required");
  }

  const distanceTime = await mapservice.getDistTime(pickup, destination);
  console.log("Distance & Duration received:", distanceTime);

  // Ensure distance and duration are numbers
  const distance = parseFloat(distanceTime.distance_km);
  const duration = parseFloat(distanceTime.duration_min);

  if (isNaN(distance) || isNaN(duration)) {
    throw new Error("Invalid distance or duration from map service");
  }

  const fareRates = {
    auto: { base: 20, perKm: 10, perMin: 1.5 },
    car: { base: 30, perKm: 13, perMin: 2 },
    motorcycle: { base: 15, perKm: 7, perMin: 1 },
  };

  const fares = {};
  for (const vehicleType in fareRates) {
    const rate = fareRates[vehicleType];
    const fare = rate.base + distance * rate.perKm + duration * rate.perMin;
    fares[vehicleType] = Math.round(fare);
  }

  return fares;
}
 function getotp(num) {
  function generateotp(num){
    const otp = crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString();
    return otp;
  }

  return generateotp(num);
}
module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getfare(pickup, destination);

  if (!fare[vehicleType] || isNaN(fare[vehicleType])) {
    throw new Error("Failed to calculate valid fare");
  }

  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    otp:getotp(4),
    fare: fare[vehicleType],
  });

  return ride;
};

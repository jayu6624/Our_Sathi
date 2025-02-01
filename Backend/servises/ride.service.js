const rideModel = require("../models/ride.model");
const mapservice = require("../servises/Maps.servise");

async function getfare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("pickup and destination is required");
  }

  const distanceTime = await mapservice.getDistTime(pickup, destination);
  const fareRates = {
    auto: { base: 30, perKm: 15, perMin: 2 },
    car: { base: 50, perKm: 20, perMin: 3 },
    motorcycle: { base: 20, perKm: 10, perMin: 1 },
  };

  const fares = {};
  for (const vehicleType in fareRates) {
    const rate = fareRates[vehicleType];
    const fare =
      rate.base +
      distanceTime.distance * rate.perKm +
      distanceTime.duration * rate.perMin;
    fares[vehicleType] = Math.round(fare);
  }

  return fares;
}

module.exports.createRide = async ({
  userID,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!userID || !pickup || !destination || !vehicleType) {
    throw new Error("all feilds are required");
  }

  const fare = await getfare(pickup, destination);
  const ride = rideModel.create({
    userID,
    pickup,
    destination,
    fare: fare[vehicleType],
  });

  return ride;
};

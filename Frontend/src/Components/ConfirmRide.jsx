import React, { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Navigation,
  BadgeIndianRupee,
  Car,
  Bike,
  Truck,
} from "lucide-react";
import Lookingfordriver from "./Lookingfordriver";

function ConfirmRide({
  backtovehicle,
  pickup,
  destination,
  vehicletype,
  fareData,
  createride,
}) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isCreatingRide, setIsCreatingRide] = useState(false);
  const [rideData, setRideData] = useState(null);

  const handleBackClick = () => {
    if (backtovehicle) {
      backtovehicle();
    }
  };

  const handleConfirm = async () => {
    // Only proceed if we have all the needed data
    if (!vehicletype || !pickup || !destination) {
      console.error("Missing required ride information");
      alert("Please ensure all ride details are complete");
      return;
    }

    try {
      setIsCreatingRide(true);
      console.log(`Confirming ride with vehicle type: ${vehicletype}`);

      // Create ride in the database if createride function is provided
      if (createride) {
        const rideResponse = await createride(vehicletype);
        console.log("Ride creation response:", rideResponse);
        setRideData(rideResponse);
      } else {
        console.warn("No createride function provided");
      }

      // Set confirmed even if no ride data (for demo purposes)
      setIsConfirmed(true);
    } catch (error) {
      console.error("Error during ride confirmation:", error);
      alert("There was a problem confirming your ride. Please try again.");
    } finally {
      setIsCreatingRide(false);
    }
  };

  // Helper function to format price with comma separators
  const formatPrice = (price) => {
    return price ? price.toLocaleString("en-IN") : "0";
  };

  // Get fare based on vehicle type
  const getFare = () => {
    if (!fareData) return "0";

    switch (vehicletype) {
      case "car":
        return formatPrice(fareData.car);
      case "auto":
        return formatPrice(fareData.auto);
      case "moto":
        return formatPrice(fareData.motorcycle);
      default:
        return "0";
    }
  };

  // Get vehicle display name
  const getVehicleName = () => {
    switch (vehicletype) {
      case "car":
        return "UberGo Car";
      case "auto":
        return "UberGo Auto";
      case "moto":
        return "UberGo Moto";
      default:
        return "UberGo";
    }
  };

  // Get vehicle icon and image
  const getVehicleImage = () => {
    switch (vehicletype) {
      case "car":
        return "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png";
      case "auto":
        return "https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png";
      case "moto":
        return "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png";
      default:
        return "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png";
    }
  };

  // Get vehicle icon component
  const VehicleIcon = () => {
    switch (vehicletype) {
      case "auto":
        return <Truck className="w-6 h-6 text-gray-700" />;
      case "moto":
        return <Bike className="w-6 h-6 text-gray-700" />;
      case "car":
      default:
        return <Car className="w-6 h-6 text-gray-700" />;
    }
  };

  if (isConfirmed) {
    return <Lookingfordriver rideData={rideData} />;
  }

  return (
    <div className="font-sans max-w-md mx-auto bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <ArrowLeft
            onClick={handleBackClick}
            className="w-6 h-6 mr-3 cursor-pointer text-gray-700 hover:text-black"
          />
          <h2 className="text-xl font-semibold">Confirm your ride</h2>
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-3">
            <VehicleIcon />
          </div>
          <div>
            <h3 className="font-semibold">{getVehicleName()}</h3>
            <p className="text-xs text-gray-500">Arrives in 3 mins</p>
          </div>
        </div>
        <img
          className="w-20 h-16 object-contain"
          src={getVehicleImage()}
          alt={getVehicleName()}
        />
      </div>

      {/* Ride Details */}
      <div className="space-y-4 px-4 py-3">
        {/* Pickup Location */}
        <div className="flex items-start py-2">
          <div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center">
            <MapPin size={18} className="text-gray-700" />
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-sm">{pickup}</h3>
            <p className="text-xs text-gray-500">{pickup}</p>
          </div>
        </div>

        <div className="border-b border-gray-200 w-full"></div>

        {/* Destination */}
        <div className="flex items-start py-2">
          <div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center">
            <Navigation size={18} className="text-gray-700" />
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-sm">{destination}</h3>
            <p className="text-xs text-gray-500">{destination}</p>
          </div>
        </div>

        <div className="border-b border-gray-200 w-full"></div>

        {/* Price */}
        <div className="flex items-start py-2">
          <div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center">
            <BadgeIndianRupee size={18} className="text-gray-700" />
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-sm">₹{getFare()}</h3>
            <p className="text-xs text-gray-500">Final fare</p>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="p-4">
        <button
          onClick={handleConfirm}
          disabled={isCreatingRide}
          className={`w-full ${
            isCreatingRide ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
          } text-white rounded-lg py-3 font-bold transition-colors`}
        >
          {isCreatingRide ? "Creating ride..." : "Let's Goo"}
        </button>
      </div>
    </div>
  );
}

export default ConfirmRide;

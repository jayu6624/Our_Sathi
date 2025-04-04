import React, { useState, useEffect } from "react";
import "../CSS/Start.css";
import {
  UserRoundSearch,
  MapPinCheckInside,
  BadgeIndianRupee,
  Navigation,
  MapPin,
  Car,
  Truck,
  Bike,
} from "lucide-react";
import Waitfordriver from "./Waitfordriver";

function Lookingfordriver({ rideData }) {
  const [showWaitForDriver, setShowWaitForDriver] = useState(false);

  // Log ride data to console for debugging
  useEffect(() => {
    console.log("Ride data in Lookingfordriver:", rideData);
  }, [rideData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWaitForDriver(true);
    }, 5000); // 5 seconds for better user experience

    return () => clearTimeout(timer);
  }, []);

  // Helper function to get the correct vehicle image
  const getVehicleImage = () => {
    if (!rideData || !rideData.vehicletype) {
      return "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png";
    }

    switch (rideData.vehicletype) {
      case "auto":
        return "https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png";
      case "moto":
        return "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png";
      case "car":
      default:
        return "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png";
    }
  };

  // Helper function to get the vehicle icon component
  const VehicleIcon = () => {
    if (!rideData || !rideData.vehicletype) {
      return <Car className="text-gray-700" />;
    }

    switch (rideData.vehicletype) {
      case "auto":
        return <Truck className="text-gray-700" />;
      case "moto":
        return <Bike className="text-gray-700" />;
      case "car":
      default:
        return <Car className="text-gray-700" />;
    }
  };

  // Helper function to format price
  const formatPrice = (price) => {
    return typeof price === "number" ? price.toLocaleString("en-IN") : "190.20"; // Default fallback price
  };

  if (showWaitForDriver) {
    return <Waitfordriver rideData={rideData} />;
  }

  return (
    <div className="font-sans max-w-md mx-auto bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-center">
          Looking for Driver
        </h2>
      </div>

      {/* Vehicle Image */}
      <div className="flex justify-center p-4">
        <img
          className="h-32 object-contain"
          src={getVehicleImage()}
          alt="Vehicle"
        />
      </div>

      {/* Ride Details */}
      <div className="space-y-4 px-4 mb-4">
        {/* Pickup Location */}
        <div className="flex items-start py-2">
          <div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center">
            <MapPin size={18} className="text-gray-700" />
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-sm">
              {rideData?.pickup?.split(",")[0] || "Pick-up Location"}
            </h3>
            <p className="text-xs text-gray-500">
              {rideData?.pickup || "Pickup location details"}
            </p>
          </div>
        </div>

        <div className="border-b border-gray-200 w-full"></div>

        {/* Destination */}
        <div className="flex items-start py-2">
          <div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center">
            <Navigation size={18} className="text-gray-700" />
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-sm">
              {rideData?.destination?.split(",")[0] || "Destination"}
            </h3>
            <p className="text-xs text-gray-500">
              {rideData?.destination || "Destination details"}
            </p>
          </div>
        </div>

        <div className="border-b border-gray-200 w-full"></div>

        {/* Price */}
        <div className="flex items-start py-2">
          <div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center">
            <BadgeIndianRupee size={18} className="text-gray-700" />
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-sm">
              ₹{formatPrice(rideData?.fare)}
            </h3>
            <p className="text-xs text-gray-500">Final fare</p>
          </div>
        </div>
      </div>

      {/* Loading Animation */}
      <div className="flex flex-col items-center justify-center p-6">
        <div className="loader mb-3"></div>
        <p className="text-gray-600 text-sm">Connecting you with a driver...</p>
      </div>
    </div>
  );
}

export default Lookingfordriver;

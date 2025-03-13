import React, { useState, useEffect } from "react";
import "../CSS/Start.css";
import {
  UserRoundSearch,
  MapPinCheckInside,
  BadgeIndianRupee,
  Navigation,
  MapPin,
} from "lucide-react";
import Waitfordriver from "./Waitfordriver";

function Lookingfordriver() {
  const [showWaitForDriver, setShowWaitForDriver] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWaitForDriver(true);
    }, 5000); // 5 seconds for better user experience

    return () => clearTimeout(timer);
  }, []);

  if (showWaitForDriver) {
    return <Waitfordriver />;
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
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png"
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
            <h3 className="font-semibold text-sm">5612/11-A</h3>
            <p className="text-xs text-gray-500">
              Opposite Galaxy Mall, Rajkot - 360001, Gujarat, India
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
            <h3 className="font-semibold text-sm">1234/56-B</h3>
            <p className="text-xs text-gray-500">Ahmedabad</p>
          </div>
        </div>

        <div className="border-b border-gray-200 w-full"></div>

        {/* Price */}
        <div className="flex items-start py-2">
          <div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center">
            <BadgeIndianRupee size={18} className="text-gray-700" />
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-sm">₹190.20</h3>
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

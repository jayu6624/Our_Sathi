import React, { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Navigation,
  BadgeIndianRupee,
  Car,
} from "lucide-react";
import Lookingfordriver from "./Lookingfordriver";

function ConfirmRide({ backtovehicle }) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleBackClick = () => {
    if (backtovehicle) {
      backtovehicle();
    }
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  if (isConfirmed) {
    return <Lookingfordriver />;
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
            <Car className="w-6 h-6 text-gray-700" />
          </div>
          <div>
            <h3 className="font-semibold">UberGo</h3>
            <p className="text-xs text-gray-500">Arrives in 3 mins</p>
          </div>
        </div>
        <img
          className="w-20 h-16 object-contain"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png"
          alt="UberGo"
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

      {/* Confirm Button */}
      <div className="p-4">
        <button
          onClick={handleConfirm}
          className="w-full bg-green-600 text-white rounded-lg py-3 font-bold hover:bg-green-700 transition-colors"
        >
          Let's Goo
        </button>
      </div>
    </div>
  );
}

export default ConfirmRide;

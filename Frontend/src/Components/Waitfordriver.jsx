import React, { useState } from "react";
import {
  UserRoundSearch,
  MapPin,
  BadgeIndianRupee,
  Home,
  Navigation,
} from "lucide-react";
import PaymentOptions from "./PaymentOptions";

function Waitfordriver() {
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  if (showPaymentOptions) {
    return <PaymentOptions amount={190.2} />;
  }

  return (
    <div className="font-sans max-w-md mx-auto bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Driver is Coming</h2>
        <Home
          onClick={() => {
            window.location.href = "/start";
          }}
          className="w-6 h-6 cursor-pointer text-gray-700 hover:text-black"
        />
      </div>

      {/* Driver Info */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9RXS21NyChcFGtl7yxd_IAW77zrYkCuSy4Q&s"
            alt="Driver"
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div>
            <h2 className="text-xl font-bold">Jaydeep</h2>
            <p className="text-sm text-gray-700">Maruti Suzuki Alto</p>
            <p className="text-sm font-semibold">GJ-03-4813</p>
          </div>
        </div>
        <img
          className="w-20 h-16 object-contain"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png"
          alt="Vehicle"
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

      {/* Payment Button */}
      <div className="p-4">
        <button
          onClick={() => setShowPaymentOptions(true)}
          className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
        >
          Make a Payment
        </button>
      </div>
    </div>
  );
}

export default Waitfordriver;

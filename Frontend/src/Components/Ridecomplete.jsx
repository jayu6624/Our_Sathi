import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  BadgeIndianRupee,
  PhoneCall,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

function Ridecomplete({ onBack }) {
  const [animateOut, setAnimateOut] = useState(false);

  const handleBack = () => {
    setAnimateOut(true);
    setTimeout(() => {
      if (onBack) onBack();
    }, 300);
  };

  const handleCompleteRide = () => {
    window.location.href = "/start";
  };

  return (
    <motion.div
      className="font-sans max-w-md mx-auto bg-white rounded-lg shadow-md"
      initial={{ opacity: 1 }}
      animate={animateOut ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <ArrowLeft
            onClick={handleBack}
            className="w-6 h-6 mr-3 cursor-pointer text-gray-700 hover:text-black"
          />
          <h2 className="text-xl font-semibold">Ride Complete</h2>
        </div>
        <div className="bg-green-100 p-1 rounded-full">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
      </div>

      {/* Trip Summary */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center">
          <img
            className="h-14 w-14 rounded-full object-cover mr-4"
            src="https://img.freepik.com/premium-photo/face-smiling-indian-man_130568-534.jpg"
            alt="Driver"
          />
          <div>
            <h2 className="text-lg font-semibold">Harsh Patel</h2>
            <p className="text-sm text-gray-500">Maruti Suzuki Alto</p>
            <div className="flex items-center mt-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-4 h-4 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">4.9</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold">2.2 Km</p>
          <p className="text-xs text-gray-500">25 mins</p>
        </div>
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

        {/* Contact */}
        <div className="flex items-start py-2">
          <div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center">
            <PhoneCall size={18} className="text-gray-700" />
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-sm">+91-1234567890</h3>
            <p className="text-xs text-gray-500">Contact for any queries</p>
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="p-4 border-t border-gray-200">
        <h3 className="font-semibold mb-3">Payment Summary</h3>
        <div className="space-y-2 mb-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Gross Payment</span>
            <span>₹190.20</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">UPI Discount (9%)</span>
            <span className="text-green-600">- ₹17.12</span>
          </div>
          <div className="border-b border-gray-200 w-full my-2"></div>
          <div className="flex justify-between font-bold">
            <span>Final Payment</span>
            <span>₹173.08</span>
          </div>
        </div>

        <div className="bg-green-50 p-3 rounded-lg flex items-center mb-4">
          <BadgeIndianRupee className="w-5 h-5 text-green-600 mr-2" />
          <div>
            <p className="text-sm font-semibold text-green-800">
              Payment Successful
            </p>
            <p className="text-xs text-green-600">Paid via UPI</p>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="p-4">
        <button
          onClick={handleCompleteRide}
          className="w-full bg-green-600 text-white rounded-lg py-3 font-bold hover:bg-green-700 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </motion.div>
  );
}

export default Ridecomplete;

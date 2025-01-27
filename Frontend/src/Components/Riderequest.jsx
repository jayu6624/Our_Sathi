import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LogOut,
  MapPinCheckInside,
  UserRoundSearch,
  ArrowDown,
  PhoneCall,
} from 'lucide-react';
import { motion } from 'framer-motion';

function Riderequest({ onBack }) {
  const [animateOut, setAnimateOut] = useState(false);

  const handleBack = () => {
    setAnimateOut(true); // Trigger the animation
    setTimeout(() => {
      if (onBack) onBack(); // Call the onBack prop function
    }, 500); // Match the animation duration
  };

  return (
    <motion.div
      className="h-screen flex flex-col"
      initial={{ y: 0 }}
      animate={animateOut ? { y: '100vh' } : { y: 0 }}
      transition={{ duration: 0.3 }}
    >
      
    
      {/* Main Content */}
      <div className="flex-1 bg-white p-4 overflow-y-auto">
        <div className="">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Confirm Ride</h2>
            <button onClick={handleBack} className="p-2">
              <ArrowDown className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Rider Info */}
          <div className="flex justify-between items-center bg-gray-300 p-3 rounded-lg mb-4">
            <div className="flex items-center gap-3">
              <img
                className="h-14 w-14 rounded-full"
                src="https://img.freepik.com/premium-photo/face-smiling-indian-man_130568-534.jpg"
                alt="Rider"
              />
              <h2 className="text-lg font-semibold">Harsh Patel</h2>
            </div>
            <p className="font-semibold text-lg">2.2 Km</p>
          </div>

          {/* Ride Details */}
          <div className="space-y-4">
            {/* Pickup Location */}
            <div className="flex items-start">
              <UserRoundSearch className="h-5 w-5 mt-1" />
              <div className="ml-3">
                <h3 className="text-sm font-bold">5612/11-A</h3>
                <p className="text-xs text-gray-600">
                  Rajkot Opposite Galaxy Mall, Rajkot - 360001, Gujarat, India
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full border-b border-gray-300"></div>

            {/* Drop Location */}
            <div className="flex items-start">
              <MapPinCheckInside className="h-5 w-5 mt-1" />
              <div className="ml-3">
                <h3 className="text-sm font-bold">1234/56-B</h3>
                <p className="text-xs text-gray-600">Ahmedabad</p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full border-b border-gray-300"></div>

            {/* Notes */}
            <div className="flex items-start">
              <PhoneCall className="h-5 w-5 mt-1" />
              <div className="ml-3">
                <h3 className="text-sm font-bold">+91-1234567890</h3>
                <p className="text-xs text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Recusandae, illum!
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full border-b border-gray-300"></div>

            {/* Payment Summary */}
            <div className="mt-4">
              <h3 className="text-sm font-bold mb-2">Payment</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Gross Payment</span>
                  <span>₹190.20</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>- ₹40.70</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Final Payment</span>
                  <span>₹149.50</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 w-full bg-[#ffc100ba]">
        <button
          onClick={() => alert('Ride Picked!')}
          className="w-full text-center p-4 text-blacl font-bold  hover:bg-[#8f7938ba]"
        >
          Peekup Ride
        </button>
      </div>
    </motion.div>
  );
}

export default Riderequest;


// import React from "react";
// import { LogOut, ArrowDown } from "lucide-react";

// function Riderequest({ onBack }) {
//   return (
//     <div className="h-screen flex flex-col">
//       <div className="flex-1 bg-white p-4 overflow-y-auto">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Confirm Ride</h2>
//           <button onClick={onBack} className="p-2">
//             <ArrowDown className="w-5 h-5 text-gray-700" />
//           </button>
//         </div>

//         <div className="flex justify-center items-center">
//           <p className="text-lg font-semibold">Ride details will be here...</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Riderequest;

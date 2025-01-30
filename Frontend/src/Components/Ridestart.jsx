import React from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  MapPinCheckInside,
  UserRoundSearch,
  PhoneCall,
} from "lucide-react";

function Ridestart({ setridepannel, setridestart, setShowOTP }) {
  return (
    <motion.div
      className="flex flex-col h-full absolute top-12"
      initial={{ y: "100vh" }}
      animate={{ y: 0 }}
      exit={{ y: "100vh" }}
      transition={{ duration: 0.3 }}
    >
      {/* Main Content */}
      <div className="flex-1 bg-white p-4 overflow-y-auto">
        <div className="h-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Confirm Ride</h2>
            <button
              className="p-2"
              onClick={() => {
                setridepannel(false);
                setridestart(false);
              }}
            >
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
            <DetailRow
              icon={<UserRoundSearch className="h-5 w-5 mt-1" />}
              title="5612/11-A"
              description="Rajkot Opposite Galaxy Mall, Rajkot - 360001, Gujarat, India"
            />

            {/* Divider */}
            <Divider />

            {/* Drop Location */}
            <DetailRow
              icon={<MapPinCheckInside className="h-5 w-5 mt-1" />}
              title="1234/56-B"
              description="Ahmedabad"
            />

            {/* Divider */}
            <Divider />

            {/* Notes */}
            <DetailRow
              icon={<PhoneCall className="h-5 w-5 mt-1" />}
              title="+91-1234567890"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, illum!"
            />

            {/* Divider */}
            <Divider />
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 w-full bg-[#ffc100ba]">
        <button
          className="w-full text-center p-4 text-black font-bold hover:bg-[#8f7938ba]"
          onClick={() => {
            setShowOTP(true);
          }}
        >
          Start Ride
        </button>
      </div>
    </motion.div>
  );
}

// Component for details row
const DetailRow = ({ icon, title, description }) => (
  <div className="flex items-start">
    {icon}
    <div className="ml-3">
      <h3 className="text-sm font-bold">{title}</h3>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  </div>
);

// Divider Component
const Divider = () => <div className="w-full border-b border-gray-300"></div>;

export default Ridestart;

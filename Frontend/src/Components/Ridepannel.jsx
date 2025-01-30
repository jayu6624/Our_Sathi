import React, { useState } from "react";
import {
  ArrowDown,
  UserRoundSearch,
  MapPinCheckInside,
  BadgeIndianRupee,
} from "lucide-react";
import { motion } from "framer-motion";

function Ridepannel({ setridepannel, setridestart, setriderequest }) {
  const handleClose = () => {
    console.log("Closing ridepannel");
    setridepannel(false);
  };

  const requesthandler = () => {
    if (typeof setriderequest === "function") {
      console.log("Ride request accepted");
      setriderequest(true);
      setridepannel(false);
      setridestart(true);
    } else {
      console.error("setriderequest is not defined or not a function!");
    }
  };

  return (
    <motion.div
      className="flex flex-col bg-transparent"
      initial={{ y: "100vh" }}
      animate={{ y: 0 }}
      exit={{ y: "100vh" }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full font-sans bg-white">
        <div className="confirm_ride bg-gray-100 rounded-t-lg w-full">
          {/* Header */}
          <div className="flex justify-between">
            <h2 className="text-xl pl-3 font-bold p-2">New Rides!</h2>
            <button
              className="flex justify-center items-center p-3"
              onClick={handleClose}
            >
              <ArrowDown className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Ride Details */}
          <div className="flex justify-between items-center p-2">
            <div className="flex items-center p-2 gap-3 text-lg font-semibold">
              <img
                className="h-14 w-14 rounded-full"
                src="https://img.freepik.com/premium-photo/face-smiling-indian-man_130568-534.jpg"
                alt="Driver"
              />
              <h2>Harsh Patel</h2>
            </div>
            <p className="font-semibold text-lg p-2">2.2 Km</p>
          </div>

          {/* Pickup Location */}
          <div className="w-full p-3">
            <div className="flex items-center h-16">
              <span className="ml-3">
                <UserRoundSearch />
              </span>
              <div className="ml-3">
                <h3 className="text-lg font-bold">5612/11-A</h3>
                <p className="text-xs">
                  Rajkot Opposite Galaxy Mall, Rajkot - 360001, Gujarat, India
                </p>
              </div>
            </div>

            <div className="w-full border-b-2 border-[#00000035] rounded-3xl mt-3"></div>

            {/* Destination */}
            <div className="flex items-center h-16 mt-2">
              <span className="ml-3">
                <MapPinCheckInside />
              </span>
              <div className="ml-3">
                <h3 className="text-lg font-bold">1234/56-B</h3>
                <p>Ahmedabad</p>
              </div>
            </div>

            <div className="w-full border-b-2 border-[#00000035] rounded-3xl mt-3"></div>

            {/* Fare */}
            <div className="flex items-center h-16 mt-2">
              <span className="ml-3">
                <BadgeIndianRupee />
              </span>
              <div className="ml-3">
                <h3 className="text-lg font-bold">₹190.20</h3>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full flex justify-around mt-3 font-semibold">
              <button
                className="bg-gray-400 w-1/2 p-2 m-4 rounded-xl"
                onClick={handleClose}
              >
                Ignore
              </button>

              <button
                onClick={requesthandler}
                className="bg-[#ffc100ba] w-1/2 p-2 m-4 rounded-xl"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Ridepannel;

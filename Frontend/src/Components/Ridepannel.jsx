import React from "react";
import {
  ArrowDown,
  UserRoundSearch,
  MapPinCheckInside,
  BadgeIndianRupee,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

function Ridepannel({ setridepannel, setriderequest }) {
  const handleClose = () => {
    console.log("Closing ridepannel");
    setridepannel(false);
  };
  const requesthandler = () => {
    console.log("Closing ridepannel");
    setriderequest(true);
    setridepannel(false);
  };
  const [animateOut, setAnimateOut] = useState(false);

  const handleBack = () => {
    setAnimateOut(true); // Trigger the animation
    setTimeout(() => {
      if (onBack) onBack(); // Call the onBack prop function
    }, 500); // Match the animation duration
  };

  return (
    <motion.div
      className="flex flex-col bg-transparent"
      initial={{ y: 0 }}
      animate={animateOut ? { y: "100vh" } : { y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full">
        <div className="font-sans bg-white">
          <div className="confirm_ride bg-gray-100 rounded-t-lg w-full">
            <div className="flex justify-between">
              <h2 className="text-xl pl-3 font-bold p-2">New Rides!</h2>
              <button
                className="flex justify-center items-center p-3"
                onClick={() => {
                  console.log("Arrow button clicked");
                  handleClose();
                }}
              >
                <ArrowDown className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            <div className="flex justify-between items-center p-2">
              <div className="flex items-center p-2 gap-3 text-lg font-semibold">
                <img
                  className="h-14 w-14 rounded-full"
                  src="https://img.freepik.com/premium-photo/face-smiling-indian-man_130568-534.jpg"
                  alt=""
                />
                <h2>Harsh Patel</h2>
              </div>
              <p className="font-semibold text-lg p-2">2.2 Km</p>
            </div>

            <div className="w-full p-3">
              <div className="flex justify-start items-center h-16">
                <span className="ml-3">
                  <UserRoundSearch />
                </span>
                <div className="ml-3">
                  <h3 className="text-lg font-bold">5612/11-A</h3>
                  <p className="text-xs">
                    rajkot Opposite Galaxy Mall, Rajkot - 360001, Gujarat, India
                  </p>
                </div>
              </div>

              <div className="w-full border-b-2 border-[#00000035] rounded-3xl mt-3"></div>

              <div className="flex justify-start items-center h-16 mt-2">
                <span className="ml-3">
                  <MapPinCheckInside />
                </span>
                <div className="ml-3">
                  <h3 className="text-lg font-bold">1234/56-B</h3>
                  <p>ahmedabad</p>
                </div>
              </div>

              <div className="w-full border-b-2 border-[#00000035] rounded-3xl mt-3"></div>

              <div className="flex justify-start items-center h-16 mt-2">
                <span className="ml-3">
                  <BadgeIndianRupee />
                </span>
                <div className="ml-3">
                  <h3 className="text-lg font-bold">₹190.20</h3>
                </div>
              </div>

              <div className="w-full flex justify-around mt-3 font-semibold">
                <button
                  className="bg-gray-400 w-1/2 p-2 m-4 rounded-xl"
                  onClick={() => {
                    console.log("Ignore button clicked");
                    handleClose();
                  }}
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
      </div>
    </motion.div>
  );
}

export default Ridepannel;

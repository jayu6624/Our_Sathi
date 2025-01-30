import React, { useRef, useState } from "react";
import { LogOut, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Ridecomplete from "../Components/Ridecomplete";
import { motion } from "framer-motion";

function Riderunning() {
  const navigate = useNavigate();
  const [ridecomplete, setridecomplete] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleCompleteRide = () => {
    setridecomplete(false); // Close the Ridecomplete panel
    setShowPopup(true); // Show pop-up message

    setTimeout(() => {
      setShowPopup(false);
      navigate("/captainhome"); // Redirect to CaptainHome.jsx
    }, 2000); // Delay before redirect
  };

  return (
    <div className="relative">
      {/* Navbar */}
      <div className="bg-[#ffc100ba] flex items-center lg:m-3 m-1 h-[6vh]">
        <img
          className="lg:w-24 w-16 absolute m-4 flex"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <div className="flex">
          <button onClick={() => navigate("/")}>
            {" "}
            {/* Navigate to Home */}
            <LogOut className="absolute right-3 top-3" />
          </button>
        </div>
      </div>

      {/* Map or Ride Animation */}
      <div>
        <img
          src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif"
          alt="Ride Animation"
          className="h-[80vh] w-full object-cover"
        />
      </div>

      {/* Ride Controls */}
      <div className="p-2 bg-[#ffc100ba] h-[15vh] w-full fixed bottom-0">
        <div className="rounded-lg h-full">
          <div className="w-full flex justify-center items-center">
            <button className="mb-2" onClick={() => setridecomplete(true)}>
              <ChevronUp />
            </button>
          </div>
          <div className="flex justify-between px-3 items-center">
            <div>
              <h3 className="text-xl font-semibold">3 Km Away</h3>
            </div>
            <div>
              <button
                className="p-2 bg-[#588d27d7] text-lg font-semibold rounded-xl"
                onClick={() => setridecomplete(true)}
              >
                Complete Ride
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ride Complete Panel */}
      {ridecomplete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-5 rounded-xl shadow-lg w-11/12 md:w-1/2">
            <Ridecomplete
              onBack={() => setridecomplete(false)}
              onStartRide={handleCompleteRide}
            />
          </div>
        </div>
      )}

      {/* Success Pop-up Message */}
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-3 rounded-lg shadow-lg"
        >
          Ride completed successfully!
        </motion.div>
      )}
    </div>
  );
}

export default Riderunning;

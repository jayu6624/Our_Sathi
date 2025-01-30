import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "lucide-react";
const OTP = ({ setridepannel, setridestart, setShowOTP }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (value, index) => {
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically focus next input if value is entered
      if (value !== "" && index < 3) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 absolute top-12 w-full">
      <button
        className="absolute top-2 left-2 bg-gray-200 rounded-full p-2 hover:bg-gray-300 focus:outline-none"
        onClick={() => {
          setShowOTP(false);
          setridestart(true);
        }}
      >
        <ArrowLeft />
      </button>
      <form onSubmit={() => {}} action="/riderunning">
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-md relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Enter OTP
          </h1>
          <div className="flex space-x-4 mb-4 justify-center">
            {otp.map((digit, index) => (
              <motion.input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-lg font-medium border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                whileFocus={{ scale: 1.1 }}
              />
            ))}
          </div>
          <button
            to={"/riderunning"}
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-black focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default OTP;

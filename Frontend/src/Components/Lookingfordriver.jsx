import React from "react";
import "../CSS/Start.css";
import {
  UserRoundSearch,
  MapPinCheckInside,
  BadgeIndianRupee,
} from "lucide-react";
import { useState } from "react";
import Waitfordriver from "./Waitfordriver";

function Lookingfordriver(props) {
  const [IsWaitFor, setIsWaitFor] = useState(false);

  setTimeout(() => {
    setIsWaitFor(true);
  }, 2000);
  if (IsWaitFor) {
    window.location.href = "/riding";
  }
  return (
    <div className="font-sans">
      <div className=" confirm_ride bg-gray-100 rounded-t-lg w-full ">
        <h2 className="text-2xl font-bold bottom-0  m-auto flex justify-center items-center p-2">
          Looking for Driver
        </h2>
        <div className="flex justify-center items-center">
          <img
            className="w-[40%] flex m-auto"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png"
            alt=""
          />
        </div>

        <div className="w-full p-5 ">
          <div className="flex justify-start items-center h-16   ">
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
          <div className="flex justify-start items-center h-16  mt-2">
            <span className="ml-3">
              <MapPinCheckInside />
            </span>
            <div className="ml-3">
              <h3 className="text-lg font-bold">1234/56-B</h3>
              <p>ahmedabad</p>
            </div>
          </div>
          <div className="w-full border-b-2 border-[#00000035] rounded-3xl mt-3"></div>
          <div className="flex justify-start items-center h-16  mt-2">
            <span className="ml-3">
              <BadgeIndianRupee />
            </span>
            <div className="ml-3">
              <h3 className="text-lg font-bold">₹190.20</h3>
              <p></p>
            </div>
          </div>
          <div className="flex justify-center items-center p-5">
            <div className="loader"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lookingfordriver;

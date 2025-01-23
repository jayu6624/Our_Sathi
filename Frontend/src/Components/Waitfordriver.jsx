import React from "react";
import {
  UserRoundSearch,
  MapPinCheckInside,
  BadgeIndianRupee,
  House,
} from "lucide-react";

import { Link } from "lucide-react";
function Waitfordriver(props) {
  return (
    <div>
      <img
        className="lg:w-24 w-16 absolute m-4"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />

      {/* Background Image */}
      <div>
        <img
          className="lg:h-screen lg:w-screen w-full h-[100vh] object-cover"
          src="https://www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png"
          alt="Map Background"
        />
      </div>
      <House
        onClick={() => {
          window.location.href = "/start";
        }}
        className="absolute  lg:w-10 lg:h-10 w-6 h-6  right-2 top-2 cursor-pointer"
      />

      <div className="font-sans">
        <div className=" confirm_ride bg-gray-100 rounded-t-lg w-full ">
          <div className="flex justify-between  pt-2 pr-4">
            <img
              className="w-[30%] flex items-start rounded-[70%] z-10"
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png"
              alt=""
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9RXS21NyChcFGtl7yxd_IAW77zrYkCuSy4Q&s"
              alt=""
              className="absolute w-16 rounded-[80%] h-16 overflow-auto left-[20%] top-4 "
            />
            <div className="flex flex-col items-end justify-center">
              <h2 className="text-xl font-bold">Jaydeep</h2>
              <h4 className="text-lg font-semibold">GJ-03-4813</h4>
              <p className="text-sm text-gray-700">Maruti Suzuki Alto</p>
            </div>
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
                <BadgeIndianRupee />
              </span>
              <div className="ml-3">
                <h3 className="text-lg font-bold">₹190.20</h3>
              </div>
            </div>
            <div className=" flex justify-center p-2 bg-green-600 rounded-2xl mb-4">
              <button className="text-lg font-bold text-gray-200">
                {" "}
                Make a Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Waitfordriver;

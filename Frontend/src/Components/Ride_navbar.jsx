import React from "react";
import { Car, Package, Clock, Bookmark, User } from "lucide-react";
function Ride_navbar() {
  return (
    <div className="mx-auto flex justify-between items-center bg-whi w-full
te z-30 bg-white">
      {" "}
      <nav className="flex max-w-[85%]  flex-col md:flex-row justify-center md:justify-between items-center p-4 border-b shadow-md w-full mx-auto">
        <div className="text-2xl font-bold text-center md:text-left mb-2 md:mb-0">
          Our_<span className="text-blue-400">साथी</span>
        </div>
        <div className="flex space-x-6 flex-wrap justify-center">
          <div className="flex items-center space-x-1 border-b-2 border-black pb-1 cursor-pointer">
            <Car size={20} />
            <span className="font-semibold">Ride</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500 cursor-pointer hover:text-black">
            <Package size={20} />
            <span>Courier</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500 cursor-pointer hover:text-black">
            <Clock size={20} />
            <span>Rentals</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          <div className="flex items-center space-x-1 text-gray-500 cursor-pointer hover:text-black">
            <Bookmark size={20} />
            <span>Activity</span>
          </div>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer">
            <User size={20} className="text-gray-600" />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Ride_navbar;

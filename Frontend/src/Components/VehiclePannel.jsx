import React from "react";
import { ArrowLeftCircle, UserRound } from "lucide-react";

function VehiclePannel({
  onBackToForm,
  onVehicleSelect,
  setConfirmRidePannel,
  fareData,
  setVehicletype,
  createride,
}) {
  // Helper function to format price with comma separators
  const formatPrice = (price) => {
    return price ? price.toLocaleString("en-IN") : "0";
  };

  // Handle vehicle selection with specific vehicle type
  const handleVehicleSelect = (type) => {
    // Set the vehicle type first
    if (setVehicletype) {
      setVehicletype(type);
    }

    // Then navigate to next step
    if (onVehicleSelect) {
      onVehicleSelect();
    } else if (setConfirmRidePannel) {
      setConfirmRidePannel(true);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Choose a Vehicle</h2>
        <button
          onClick={onBackToForm}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeftCircle size={20} />
        </button>
      </div>

      <div className="space-y-3">
        {/* UberGo Car */}
        <div
          className="flex items-center border-2 rounded-xl p-3 cursor-pointer hover:border-black active:border-black shadow-md"
          onClick={() => handleVehicleSelect("car")}
        >
          <div className="w-20 flex-shrink-0">
            <img
              className="h-12 object-contain"
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png"
              alt="UberGo"
            />
          </div>
          <div className="flex-1 px-2">
            <div className="flex items-center">
              <h3 className="font-bold text-sm">UberGo</h3>
              <div className="flex items-center ml-2 text-xs">
                <UserRound size={14} className="mr-1" />
                <span>4</span>
              </div>
            </div>
            <p className="text-xs font-semibold">5 min away</p>
            <p className="text-xs text-gray-500">Affordable, compact ride</p>
          </div>
          <div className="text-right">
            <p className="font-bold">
              ₹{fareData ? formatPrice(fareData.car) : "193.20"}
            </p>
          </div>
        </div>

        {/* UberGo Auto */}
        <div
          className="flex items-center border-2 rounded-xl p-3 cursor-pointer hover:border-black active:border-black shadow-md"
          onClick={() => handleVehicleSelect("auto")}
        >
          <div className="w-20 flex-shrink-0">
            <img
              className="h-12 object-contain"
              src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
              alt="UberGo Auto"
            />
          </div>
          <div className="flex-1 px-2">
            <div className="flex items-center">
              <h3 className="font-bold text-sm">UberGo</h3>
              <div className="flex items-center ml-2 text-xs">
                <UserRound size={14} className="mr-1" />
                <span>3</span>
              </div>
            </div>
            <p className="text-xs font-semibold">2 min away</p>
            <p className="text-xs text-gray-500">Affordable, compact ride</p>
          </div>
          <div className="text-right">
            <p className="font-bold">
              ₹{fareData ? formatPrice(fareData.auto) : "80.00"}
            </p>
          </div>
        </div>

        {/* UberGo Moto */}
        <div
          className="flex items-center border-2 rounded-xl p-3 cursor-pointer hover:border-black active:border-black shadow-md"
          onClick={() => handleVehicleSelect("moto")}
        >
          <div className="w-20 flex-shrink-0">
            <img
              className="h-12 object-contain"
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
              alt="UberGo Moto"
            />
          </div>
          <div className="flex-1 px-2">
            <div className="flex items-center">
              <h3 className="font-bold text-sm">UberGo</h3>
              <div className="flex items-center ml-2 text-xs">
                <UserRound size={14} className="mr-1" />
                <span>1</span>
              </div>
            </div>
            <p className="text-xs font-semibold">1 min away</p>
            <p className="text-xs text-gray-500">Affordable, compact ride</p>
          </div>
          <div className="text-right">
            <p className="font-bold">
              ₹{fareData ? formatPrice(fareData.motorcycle) : "65.00"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehiclePannel;

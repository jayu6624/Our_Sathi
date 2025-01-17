

import React from "react";
import { ArrowLeftCircle, UserRound } from "lucide-react";
import "../CSS/Start.css";

function VehiclePannel(props) {
  const handleBackClick = () => {
    props.onBackToForm();
  };

  const handleVehicleSelect = () => {
    props.setConfirmRidePannel(true); // Trigger ConfirmRide panel
  };

  return (
    <div>
      {props.isConfirm && (
        <div className="vehical_list xs:fixed lg:w-[25%] w-full z-10 p-3 h-auto bg-white space-y-2 rounded-t-lg">
          <h1 className="text-xl lg:text-2xl p-2 font-semibold mb-2 flex w-full">
            Choose a Vehicle{" "}
            <span>
              <button onClick={handleBackClick}>
                <ArrowLeftCircle className="flex absolute right-4 top-6" />
              </button>
            </span>
          </h1>

          {/* Vehicle Cards Container */}
          <div className="flex-col lg:flex-row lg:flex-wrap space-y-3">
            {/* Vehicle Card 1 */}
            <div
              className="flex items-center justify-between border-[2px] shadow-lg active:border-black rounded-2xl h-24"
              onClick={handleVehicleSelect}
            >
              <img
                className="h-16"
                src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png"
                alt=""
              />
              <div className="p-3 text-sm lg:text-base w-2/3 h-24 justify-center">
                <h3 className="flex font-bold text-md lg:text-lg">
                  UberGo
                  <span className="flex">
                    <UserRound
                      strokeWidth={2}
                      className="size-[17px] font-bold ml-3 mt-1.5 mr-1"
                    />
                    4
                  </span>
                </h3>
                <h5 className="text-xs lg:text-sm font-bold">5 min away</h5>
                <p className="text-gray-950 text-xs lg:text-sm">
                  Affordable, compact ride
                </p>
              </div>
              <h2 className="font-bold mr-3 m-auto justify-center lg:text-lg">
                ₹193.20
              </h2>
            </div>

            {/* Vehicle Card 2 */}
            <div
              className="flex justify-center items-center border-[2px] shadow-lg active:border-black rounded-2xl h-24"
              onClick={handleVehicleSelect}
            >
              <img
                className="h-16"
                src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
                alt=""
              />
              <div className="p-3 text-sm lg:text-base w-2/3 h-24 m-auto">
                <h3 className="flex font-bold text-md lg:text-lg">
                  UberGo
                  <span className="flex">
                    <UserRound
                      strokeWidth={2}
                      className="size-[17px] font-bold ml-3 mt-1.5 mr-1"
                    />
                    3
                  </span>
                </h3>
                <h5 className="text-xs lg:text-sm font-bold">2 min away</h5>
                <p className="text-xs lg:text-sm">Affordable, compact ride</p>
              </div>
              <h2 className="font-bold mr-3 m-auto justify-center lg:text-lg">
                ₹80.00
              </h2>
            </div>

            {/* Vehicle Card 3 */}
            <div
              className="flex items-center justify-between border-[2px] shadow-lg active:border-black rounded-2xl h-24"
              onClick={handleVehicleSelect}
            >
              <img
                className="h-16"
                src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
                alt=""
              />
              <div className="p-3 text-sm lg:text-base w-2/3 h-24 m-auto">
                <h3 className="flex font-bold text-md lg:text-lg">
                  UberGo
                  <span className="flex">
                    <UserRound
                      strokeWidth={2}
                      className="size-[17px] font-bold ml-3 mt-1.5 mr-1"
                    />
                    1
                  </span>
                </h3>
                <h5 className="text-xs lg:text-sm font-bold">1 min away</h5>
                <p className="text-xs lg:text-sm">Affordable, compact ride</p>
              </div>
              <h2 className="font-bold mr-3 m-auto justify-center lg:text-lg">
                ₹65.00
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VehiclePannel;

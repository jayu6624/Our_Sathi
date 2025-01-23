// import React, { useState } from "react";
// import {
//   MapPin,
//   ArrowRightCircle,
//   ArrowDown,
//   UserRound,
//   ArrowLeftCircle,
// } from "lucide-react";
// import "../CSS/Start.css"; // Importing CSS for custom styles
// import LocationSearch from "../Components/LocationSearch";

// function Start() {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isConfirm, setIsConfirm] = useState(false);

//   const handleExpandClick = () => {
//     setIsExpanded(true);
//     setIsConfirm(false);
//   };

//   const handleCollapseClick = () => {
//     setIsExpanded(false);
//   };

//   const handleConfirmClick = (e) => {
//     e.preventDefault();
//     const pickUp = document.getElementById("pickup").value.trim();
//     const destination = document.getElementById("destination").value.trim();
//     if (pickUp && destination) {
//       setIsConfirm(true);
//       setIsExpanded(false);
//     } else {
//       alert("Please fill in all required fields.");
//     }
//   };

//   return (
//     <div className="w-full">
//       {/* Uber logo */}
//       <img
//         className="lg:w-24 w-16 absolute m-4"
//         src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
//         alt="Uber Logo"
//       />

//       {/* Background Image */}
//       <div>
//         <img
//           className="lg:h-screen lg:w-screen w-full h-[100vh] object-cover"
//           src="https://www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png"
//           alt="Map Background"
//         />
//       </div>
//       {isConfirm == true ? (
//         <div className="hidden"></div>
//       ) : (
//         <div className="flex justify-center lg:h-[100%] space-y-3 bg-white">
//           {/* Input Fields Section */}
//           <div
//             className={`form-container ${
//               isExpanded ? "expanded" : "collapsed"
//             } bg-white lg:w-[35%] w-full p-5 lg:mt-20 rounded-xl shadow-xl`}
//           >
//             {/* Back Button and Title */}
//             {isExpanded && (
//               <div className="flex items-center space-x-4">
//                 <button
//                   onClick={handleCollapseClick}
//                   className="absolute right-4 top-2 bg-white p-2 rounded-full hover:bg-gray-300"
//                 >
//                   <ArrowDown className="w-5 h-5 text-gray-700" />
//                 </button>
//               </div>
//             )}
//             <div className="flex-1 text-center">
//               <h4 className="text-xl font-semibold text-gray-800">
//                 Find a trip
//               </h4>
//             </div>

//             {/* Pick-up point input */}
//             <form>
//               <div className="relative my-3">
//                 <MapPin className="absolute left-3 top-1/2 w-5 transform -translate-y-1/2 text-gray-700" />
//                 <input
//                   id="pickup"
//                   type="text"
//                   placeholder="Add a pick-up point"
//                   className="bg-[#eee] w-full h-9 rounded-lg py-2 pl-10"
//                   required
//                   onFocus={handleExpandClick}
//                 />
//               </div>

//               {/* Destination input */}
//               <div className="relative my-3">
//                 <ArrowRightCircle className="absolute left-3 w-5 top-1/2 transform -translate-y-1/2 text-gray-700" />
//                 <input
//                   id="destination"
//                   type="text"
//                   placeholder="Enter your destination"
//                   className="bg-[#eee] w-full h-9 rounded-lg py-2 pl-10"
//                   required
//                   onFocus={handleExpandClick}
//                 />
//               </div>

//               {isExpanded && (
//                 <button
//                   className="bg-black text-white flex justify-center p-2 rounded-lg w-[30%] shadow-lg mt-3 items-center m-auto"
//                   onClick={handleConfirmClick}
//                 >
//                   Confirm
//                 </button>
//               )}

//               <div className="p-1 mt-5">{isExpanded && <LocationSearch />}</div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Vehicle Section */}
//       {/* Vehicle Section */}

//       {isConfirm && (
//         <div className="vehical_list fixed lg:w-[30%] w-full z-10 bottom-0 p-3 h-[53%] bg-white space-y-2 rounded-t-lg">
//           <h1 className="text-xl p-2 font-semibold mb-2 flex w-full">
//             Choose a Vehicle{" "}
//             <span>
//               {" "}
//               <button onClick={handleExpandClick}>
//                 <ArrowLeftCircle className="flex absolute right-4 top-6" />
//               </button>
//             </span>
//           </h1>

//           {/* Vehicle Cards Container */}
//           <div className=" flex-col lg:flex-row lg:flex-wrap   space-y-3">
//             {/* Vehicle Card 1 */}
//             <div className=" flex items-center justify-between border-[2px] shadow-lg active:border-black rounded-2xl h-20 ">
//               <img
//                 className="h-16"
//                 src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png"
//                 alt=""
//               />
//               <div className="p-3 text-sm w-2/3 h-24 m-auto">
//                 <h3 className="flex font-bold text-md">
//                   UberGo
//                   <span className="flex">
//                     <UserRound
//                       Round
//                       strokeWidth={2}
//                       className="size-[14px] font-bold ml-3 mt-1 mr-1"
//                     />
//                     4
//                   </span>
//                 </h3>
//                 <h5 className="text-xs font-bold">5 min away</h5>
//                 <p className="text-gray-950 text-xs">
//                   Affordable, compact ride
//                 </p>
//               </div>
//               <h2 className="font-bold mr-3 m-auto justify-center">₹193.20</h2>
//             </div>

//             {/* Vehicle Card 2 */}
//             <div className="flex justify-center items-center border-[2px] shadow-lg active:border-black rounded-2xl h-20">
//               <img
//                 className="h-16"
//                 src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
//                 alt=""
//               />
//               <div className="p-3 text-sm w-2/3 h-24 m-auto">
//                 <h3 className="flex font-bold text-md">
//                   UberGo
//                   <span className="flex">
//                     <UserRound
//                       Round
//                       strokeWidth={2}
//                       className="size-[14px] font-bold ml-3 mt-1 mr-1"
//                     />
//                     3
//                   </span>
//                 </h3>
//                 <h5 className="text-xs font-bold">2 min away</h5>
//                 <p className="text-xs">Affordable, compact ride</p>
//               </div>
//               <h2 className="font-bold mr-3 m-auto justify-center">₹80.00</h2>
//             </div>

//             {/* Vehicle Card 3 */}
//             <div className="flex items-center justify-between border-[2px] shadow-lg active:border-black rounded-2xl h-20 ">
//               <img
//                 className="h-16"
//                 src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
//                 alt=""
//               />
//               <div className="p-3 text-sm w-2/3 h-24 m-auto">
//                 <h3 className="flex font-bold text-md">
//                   UberGo
//                   <span className="flex">
//                     <UserRound
//                       Round
//                       strokeWidth={2}
//                       className="size-[14px] font-bold ml-3 mt-1 mr-1"
//                     />
//                     1
//                   </span>
//                 </h3>
//                 <h5 className="text-xs font-bold">1 min away</h5>
//                 <p className="text-xs">Affordable, compact ride</p>
//               </div>
//               <h2 className="font-bold mr-3 m-auto justify-center">₹65.00</h2>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Start;

import React, { useState, useRef } from "react";
import { MapPin, ArrowRightCircle, ArrowDown } from "lucide-react";
import "../CSS/Start.css";
import LocationSearch from "../Components/LocationSearch";
import VehiclePannel from "../Components/VehiclePannel";
import ConfirmRide from "../Components/ConfirmRide";

function Start() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [confirmRidePannel, setConfirmRidePannel] = useState(false);

  const handleExpandClick = () => {
    setIsExpanded(true);
    setIsConfirm(false);
  };

  const handleCollapseClick = () => {
    setIsExpanded(false);
  };

  const handleConfirmClick = (e) => {
    e.preventDefault();
    const pickUp = document.getElementById("pickup").value.trim();
    const destination = document.getElementById("destination").value.trim();
    if (pickUp && destination) {
      setIsConfirm(true);
      setIsExpanded(false);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleBackToForm = () => {
    setIsConfirm(false);
    setConfirmRidePannel(false); // Reset confirm ride state
  };
  const backtovehicle = () => {
    console.log("backtovehicle");
    setConfirmRidePannel(false);
  };

  return (
    <div className="w-full">
      {/* Uber logo */}
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

      {!isConfirm && !confirmRidePannel ? (
        <div className="flex justify-center lg:h-auto space-y-3 bg-white m-auto">
          {/* Input Fields Section */}

          <div
            className={`form-container ${
              isExpanded ? "expanded" : "collapsed"
            } bg-white lg:w-[35%] w-full p-5 lg:mt-20 rounded-xl shadow-xl`}
          >
            {isExpanded && (
              <button
                onClick={handleCollapseClick}
                className="absolute right-4 top-2 bg-white p-2 rounded-full hover:bg-gray-300"
              >
                <ArrowDown className="w-5 h-5 text-gray-700" />
              </button>
            )}
            <form>
              <div className="">
                <h2 className="text-2xl font-semibold flex justify-center items-center">
                  Find your trip{" "}
                </h2>
              </div>
              <div className="relative my-3">
                <MapPin className="absolute left-3 top-1/2 w-5 transform -translate-y-1/2 text-gray-700" />
                <input
                  id="pickup"
                  type="text"
                  placeholder="Add a pick-up point"
                  className="bg-[#eee] w-full lg:h-16 h-9 rounded-lg lg:text-xl border-black border-2 py-2 pl-10"
                  required
                  onFocus={handleExpandClick}
                />
              </div>

              <div className="relative my-3">
                <ArrowRightCircle className="absolute left-3 w-5 top-1/2 transform -translate-y-1/2 text-gray-700" />
                <input
                  id="destination"
                  type="text"
                  placeholder="Enter your destination"
                  className="bg-[#eee] w-full h-9 lg:h-16 rounded-lg py-2 border-black border-2 lg:text-xl pl-10"
                  required
                  onFocus={handleExpandClick}
                />
              </div>

              {isExpanded && (
                <button
                  className="bg-black text-white flex justify-center p-2 rounded-lg lg:w-[40%] lg:h-14 lg:text-xl shadow-lg mt-3 items-center m-auto"
                  onClick={handleConfirmClick}
                >
                  Confirm
                </button>
              )}

              {isExpanded && <LocationSearch />}
            </form>
          </div>
        </div>
      ) : confirmRidePannel ? (
        <ConfirmRide backtovehicle={backtovehicle} />
      ) : (
        <VehiclePannel
          isConfirm={isConfirm}
          onBackToForm={handleBackToForm}
          setConfirmRidePannel={setConfirmRidePannel}
        />
      )}
    </div>
  );
}

export default Start;

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
import React, { useState, useRef, useEffect } from "react";
import { MapPin, ArrowRightCircle, Menu, X } from "lucide-react";
import "../CSS/Start.css";
import LocationSearch from "../Components/LocationSearch";
import VehiclePannel from "../Components/VehiclePannel";
import ConfirmRide from "../Components/ConfirmRide";
import Ride_navbar from "../Components/Ride_navbar";
import Ridepannel from "../Components/Ridepannel";

function Start() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [ridepannel, setridepannel] = useState(false);
  const [confirmRidePannel, setConfirmRidePannel] = useState(false);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [activeInput, setActiveInput] = useState(null); // 'pickup' or 'destination'
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [vehicle, setVehicle] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('trip'); // 'trip', 'vehicle', or 'confirm'

  // Refs for inputs
  const pickupInputRef = useRef(null);
  const destinationInputRef = useRef(null);

  // Handle input focus/click for location search
  const handleInputFocus = (inputType) => {
    setActiveInput(inputType);
    setShowLocationSearch(true);
  };

  // Enhanced location selection handler for better mobile support
  const handleLocationSelect = (location) => {
    console.log(`Setting location: ${location} for input: ${activeInput}`);

    if (activeInput === "pickup") {
      setPickup(location);
      // Focus destination after selecting pickup location
      setTimeout(() => {
        if (destinationInputRef.current) {
          destinationInputRef.current.focus();
        }
      }, 100);
    } else if (activeInput === "destination") {
      setDestination(location);
    }

    setShowLocationSearch(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (showLocationSearch) {
      setShowLocationSearch(false);
    }
  };

  // Handle input change
  const handleInputChange = (e, type) => {
    if (type === "pickup") {
      setPickup(e.target.value);
    } else {
      setDestination(e.target.value);
    }
  };

  // Close location search when clicking outside
  const handleBackdropClick = () => {
    setShowLocationSearch(false);
  };

  // Get current input value based on active input
  const getCurrentInputValue = () => {
    return activeInput === "pickup" ? pickup : destination;
  };

  // Handle transition from trip form to vehicle panel
  const handleTripFormConfirm = () => {
    setCurrentView('vehicle');
    setridepannel(true);
  };

  // Handle back navigation from vehicle panel to trip form
  const handleBackFromVehicle = () => {
    setCurrentView('trip');
    setridepannel(false);
  };

  // Handle vehicle selection to go to confirm ride panel
  const handleVehicleSelect = () => {
    setCurrentView('confirm');
    setConfirmRidePannel(true);
    setridepannel(false);
  };

  // Handle back navigation from confirm to vehicle panel
  const handleBackFromConfirm = () => {
    setCurrentView('vehicle');
    setConfirmRidePannel(false);
    setridepannel(true);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      {/* Mobile Menu Toggle - Only visible on small screens */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white z-30 relative">
        <div className="flex items-center space-x-2">
          <img src="" alt="Logo" className="h-8" />
          <h2 className="text-lg font-semibold">Ride Service</h2>
        </div>
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Left Section (1 part) - transforms to full width dropdown on mobile */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:block w-full md:w-1/4 h-auto md:h-full bg-gray-50 border-r border-gray-200 overflow-y-auto transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "absolute top-16 left-0 z-20" : ""
        }`}
      >
        <div className="p-4 md:p-6">
          <h1 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
            Navigation
          </h1>
        
          {/* Main container - Shows different views based on current state */}
          <div className="bg-white rounded-xl shadow-md p-4 md:p-5 mb-4 md:mb-6 relative">
            {currentView === 'confirm' ? (
              /* Confirm Ride Panel */
              <ConfirmRide 
                backtovehicle={handleBackFromConfirm}
              />
            ) : currentView === 'vehicle' ? (
              /* Vehicle Panel */
              <VehiclePannel 
                onBackToForm={handleBackFromVehicle}
                onVehicleSelect={handleVehicleSelect}
                setConfirmRidePannel={setConfirmRidePannel}
              />
            ) : (
              /* Trip Form - Default view */
              <>
                <h2 className="text-lg md:text-xl font-semibold text-center mb-3 md:mb-4">
                  Find your trip
                </h2>

                <div className="relative z-0">
                  {/* Pick-up input */}
                  <div className="relative mb-3 md:mb-4">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 w-5 h-5" />
                    <input
                      ref={pickupInputRef}
                      type="text"
                      placeholder="Add a pick-up point"
                      value={pickup}
                      onChange={(e) => handleInputChange(e, "pickup")}
                      onFocus={() => handleInputFocus("pickup")}
                      className="w-full bg-gray-100 border-2 border-gray-300 rounded-lg py-2 pl-10 h-10 md:h-12"
                    />
                  </div>

                  {/* Destination input */}
                  <div className="relative mb-3 md:mb-4">
                    <ArrowRightCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 w-5 h-5" />
                    <input
                      ref={destinationInputRef}
                      type="text"
                      placeholder="Enter your destination"
                      value={destination}
                      onChange={(e) => handleInputChange(e, "destination")}
                      onFocus={() => handleInputFocus("destination")}
                      className="w-full bg-gray-100 border-2 border-gray-300 rounded-lg py-2 pl-10 h-10 md:h-12"
                    />
                  </div>

                  <button 
                    className="bg-black text-white rounded-lg py-2 md:py-3 px-4 md:px-6 w-full font-medium" 
                    onClick={handleTripFormConfirm}
                  >
                    Confirm
                  </button>
                </div>

                {/* Location search overlay */}
                {showLocationSearch && (
                  <div
                    className={`absolute ${
                      activeInput === "pickup"
                        ? "top-[calc(2.5rem+2.5rem)]"
                        : "top-[calc(2.5rem+2.5rem+3.5rem)]"
                    } left-0 right-0 bg-white rounded-lg shadow-lg z-50 max-h-[300px] overflow-y-auto`}
                  >
                    <LocationSearch
                      setVehicle={setVehicle}
                      setIsExpanded={setIsExpanded}
                      onLocationSelect={handleLocationSelect}
                      inputValue={getCurrentInputValue()}
                      activeInput={activeInput}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Recent Locations - Only show when in trip form view */}
          {currentView === 'trip' && (
            <div className="bg-white rounded-xl shadow-md p-4 md:p-5">
              <h3 className="text-base md:text-lg font-medium mb-3 md:mb-4">
                Recent Locations
              </h3>
              <ul className="space-y-2 md:space-y-3">
                <li className="p-2 md:p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  Home
                </li>
                <li className="p-2 md:p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  Work
                </li>
                <li className="p-2 md:p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  Airport
                </li>
              </ul>
            </div>
          )}

          {/* Close button for mobile view */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden mt-4 w-full py-2 bg-gray-200 rounded-lg text-gray-700"
          >
            Close Menu
          </button>
        </div>
      </div>

      {/* Right Section (3 parts) */}
      <div className="w-full md:w-3/4 h-full bg-white overflow-y-auto">
        {/* Top navigation bar - hidden on mobile since we have the mobile menu */}
        <div className="hidden md:flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <img
              src="https://drive.google.com/file/d/1XZRAyL5jmJaT5NctVUjtOqct3uv73Ocq/view?usp=sharing"
              alt="Logo"
              className="h-8"
            />
            <h2 className="text-xl font-semibold">Ride Service</h2>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-sm bg-gray-100 rounded-full">
              Help
            </button>
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        {/* Main content area (map) */}
        <div className="p-3 md:p-6 h-[calc(100%-64px)] md:h-[calc(100%-64px)]">
          <img
            className="bg-cover w-full h-full"
            src="https://s.wsj.net/public/resources/images/BN-XR453_201802_M_20180228165619.gif"
            alt=""
          />
        </div>
      </div>

      {/* Backdrop when search is open */}
      {showLocationSearch && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={handleBackdropClick}
        />
      )}
    </div>
  );
}

export default Start;



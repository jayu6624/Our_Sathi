// // import React, { useState, useRef, useEffect } from "react";
// // import { Link } from "react-router-dom";
// // import { LogOut } from "lucide-react";
// // import Captaindetail from "../Components/Captaindetail.jsx";
// // import { useGSAP } from "@gsap/react";
// // import gsap from "gsap";

// // import Ridepannel from "../Components/Ridepannel.jsx";

// // function CaptainHome() {
// //   const [ridepannel, setridepannel] = useState(true);
// //   const ridepannelref = useRef(null);
// //   const [riderequest, setriderequest] = useState(false);

// //   useGSAP(
// //     function () {
// //       if (ridepannel) {
// //         gsap.to(ridepannelref.current, {
// //           transform: "translateY(0)",
// //         });
// //       } else {
// //         gsap.to(ridepannelref.current, {
// //           transform: "translateY(100%)",
// //         });
// //       }
// //     },
// //     [ridepannel]
// //   );

// //   return (
// //     <div>
// //       <div className="bg-[#ffc100ba] flex items-center lg:m-3 m-1 h-[6vh]">
// //         <img
// //           className="lg:w-24 w-16 absolute m-4 flex"
// //           src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
// //           alt="Uber Logo"
// //         />
// //         <div className="flex">
// //           <Link to="/">
// //             <LogOut className="absolute right-3 top-3" />
// //           </Link>
// //         </div>
// //       </div>

// //       <div>
// //         <img
// //           src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif"
// //           alt=""
// //           className="h-[50vh] w-full"
// //         />
// //       </div>
// //       <h2 className="flex justify-center font-semibold text-xl mt-2">
// //         Captain Profile
// //       </h2>
// //       <Captaindetail />

// //       {ridepannel && (
// //         <div
// //           className="z-10 bg-white fixed w-full bottom-0"
// //           ref={ridepannelref}
// //         >
// //           <Ridepannel
// //             setridepannel={(value) => {
// //               console.log("Setting ridepannel to:", value);
// //               setridepannel(value);
// //             }}
// //             setriderequest={(value) => {
// //               console.log("Setting riderequest to:", value);
// //               setriderequest(value);
// //             }}
// //           />
// //         </div>
// //       )}

// //     </div>
// //   );
// // }

// // export default CaptainHome;

// import React, { useState, useRef } from "react";
// import { LogOut } from "lucide-react";
// import Captaindetail from "../Components/Captaindetail.jsx";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import Ridepannel from "../Components/Ridepannel.jsx";
// import Riderequest from "../Components/Riderequest.jsx";

// function CaptainHome() {
//   const [ridepannel, setridepannel] = useState(true);
//   const [riderequest, setriderequest] = useState(false);
//   const ridepannelref = useRef(null);

//   useEffect(() => {
//     if (ridepannelref.current) {
//       if (ridepannel) {
//         gsap.to(ridepannelref.current, {
//           transform: "translateY(0)",
//         });
//       } else {
//         gsap.to(ridepannelref.current, {
//           transform: "translateY(100%)",
//         });
//       }
//     }
//   }, [ridepannel]);

//   return (
//     <div>
//       <div className="bg-[#ffc100ba] flex items-center lg:m-3 m-1 h-[6vh]">
//         <img
//           className="lg:w-24 w-16 absolute m-4 flex"
//           src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
//           alt="Uber Logo"
//         />
//         <div className="flex">
//           <LogOut className="absolute right-3 top-3" />
//         </div>
//       </div>

//       {riderequest ? (
//         <Riderequest
//           onBack={() => {
//             setriderequest(false);
//             setridepannel(true);
//           }}
//         />
//       ) : (
//         <>
//           <div>
//             <img
//               src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif"
//               alt=""
//               className="h-[50vh] w-full"
//             />
//           </div>
//           <h2 className="flex justify-center font-semibold text-xl mt-2">
//             Captain Profile
//           </h2>
//           <Captaindetail />

//           {ridepannel && (
//             <div
//               className="z-10 bg-white fixed w-full bottom-0"
//               ref={ridepannelref}
//             >
//               <Ridepannel
//                 setridepannel={(value) => setridepannel(value)}
//                 setriderequest={(value) => setriderequest(value)}
//               />
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default CaptainHome;
import React, { useState, useRef, useEffect } from "react";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import Captaindetail from "../Components/Captaindetail.jsx";
import gsap from "gsap";
import Ridepannel from "../Components/Ridepannel.jsx";
import Ridecomplete from "../Components/Ridecomplete.jsx";
import Ridestart from "../Components/Ridestart.jsx";
import OTP from "../Components/OTP.jsx"; // Import OTP component
import Riderunning from "./Riderunning.jsx";

function CaptainHome() {
  const [ridepannel, setridepannel] = useState(true);

  const [riderequest, setriderequest] = useState(false);
  const [ridestart, setridestart] = useState(false); // New state for Ridestart
  const [showOTP, setShowOTP] = useState(false); // State for controlling OTP display
  const [riderunning, setriderunning] = useState(false);
  const ridepannelref = useRef(null);
  const ridestartref = useRef(null);
  const rideotpref = useRef(null);
  const riderunningref = useRef(null);

  useEffect(() => {
    if (ridepannelref.current) {
      if (ridepannel) {
        gsap.to(ridepannelref.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridepannelref.current, {
          transform: "translateY(100%)",
        });
      }
    }
  }, [ridepannel]);

  return (
    <div>
      <div className="bg-[#ffc100ba] flex items-center lg:m-3 m-1 h-[6vh]">
        <img
          className="lg:w-24 w-16 absolute m-4 flex"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <div className="flex">
          <LogOut className="absolute right-3 top-3" />
        </div>
      </div>

      {/* {riderequest ? (
        <>
          {ridestart ? (
            <Ridecomplete
              onBack={() => {
                setriderequest(false);
                setridepannel(false);
              }}
              onStartRide={() => {
                setridestart(true); // Start ride
                setShowOTP(true); // Show OTP screen before starting the ride
              }}
            />
          ) : showOTP ? (
            <OTP
              onnext={() => {
                setridestart(true); // Start ride
                setShowOTP(false);
                setriderequest(true); // Start ride
              }}
              onStartRide={() => {
                setridestart(true); // Start ride
                setShowOTP(true); // Show OTP screen before starting the ride
              }}
              onBack={() => {
                setriderequest(false);
                setridepannel(true);
              }}
            /> // Show OTP component if showOTP is true
          ) : (
            <Ridestart
              onBack={() => {
                setriderequest(true);
                setridepannel(false);
              }}
              Onotp={() => {
                setShowOTP(true);
              }}
            />
          )}
        </>
      ) : (
        <>
          <div>
            <img
              src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif"
              alt=""
              className="h-[50vh] w-full"
            />
          </div>
          <h2 className="flex justify-center font-semibold text-xl mt-2">
            Captain Profile
          </h2>
          <Captaindetail />

          {ridepannel && (
            <div
              className="z-10 bg-white fixed w-full bottom-0"
              ref={ridepannelref}
            >
              <Ridepannel
                setridepannel={(value) => setridepannel(value)}
                setriderequest={(value) => setriderequest(value)}
              />
            </div>
          )}
        </>
      )} */}

      {/* Header with Logo and Logout */}

      {/* Profile and Ride Panels */}
      <div>
        <div>
          <img
            src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif"
            alt=""
            className="h-[50vh] w-full"
          />
        </div>

        {/* Captain Profile Section */}
        <div>
          <Captaindetail />
        </div>

        {/* Ride Panel Section */}
        {ridepannel ? (
          <div ref={ridepannelref} className="w-full z-10 bottom-0 bg-white">
            <Ridepannel
              setridepannel={setridepannel}
              setridestart={setridestart}
              setriderequest={setriderequest}
            />
          </div>
        ) : null}

        {/* Ride Start Section */}
        {ridestart ? (
          <div ref={ridestartref} className="w-full z-10 bottom-0 bg-white ">
            <Ridestart
              setridepannel={setridepannel}
              setridestart={setridestart}
              setShowOTP={setShowOTP}
            />
          </div>
        ) : null}

        {showOTP ? (
          <div ref={rideotpref} className="w-full z-10 bottom-0 bg-white ">
            <OTP
              setridepannel={setridepannel}
              setridestart={setridestart}
              setShowOTP={setShowOTP}
              setriderunning={setriderunning}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default CaptainHome;

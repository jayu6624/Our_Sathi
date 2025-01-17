// import React, { useEffect, useState } from "react";

// function UserLogin() {
//   const [isFormVisible, setIsFormVisible] = useState(false);

//   useEffect(() => {
//     // Trigger the animation after a slight delay when the component mounts
//     const timer = setTimeout(() => {
//       setIsFormVisible(true);
//     }, 300); // Delay for smoother animation

//     return () => clearTimeout(timer); // Cleanup timeout on unmount
//   }, []);

//   return (
//     <div className="h-screen w-full flex flex-col bg-red-700 pt-8 bg-[url('https://media.istockphoto.com/id/526811099/vector/traffic-lights.webp?b=1&s=612x612&w=0&k=20&c=0I55Hr-Ls4yVopz26tTW3KJiJmc3O3EEASnlJEahXr4=')] lg:bg-[url('https://t3.ftcdn.net/jpg/09/76/51/00/360_F_976510018_7OL8O74a4rneRrJ5xA41clL9zwhWy4i4.jpg')] bg-center bg-no-repeat bg-cover overflow-hidden">
//       {/* Top content */}
//       <div className="flex justify-start items-center px-4">
//         <img
//           className="backimg w-16 sm:w-20 lg:w-28 lg:pt-6 lg:ml-6"
//           src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
//           alt="Uber Logo"
//         />
//       </div>

//       {/* Animated Form Section */}
//       <div>

//       </div>
//       <div className="w-full flex  items-center justify-center">
//       <div
//         className={`fixed bottom-0 left-0 w-full h-screen flex items-center justify-center bg-opacity-0 transition-transform duration-500 ${
//           isFormVisible ? "translate-y-0" : "translate-y-full"
//         }`}
//       >
//         <div className="bg-white lg::text-lg sm:text-sm lg:w-[20%] font-medium py-5 px-5 sm:py-7 sm:px-10 rounded-2xl shadow-lg transform transition-transform">
//           <h2 className="sm:text-lg lg:text-3xl font-bold text-center mb-6">
//             Login to your account
//           </h2>
//           <form className="lg:w-[70%] mx-auto w-[70%]">
//             {/* Email Input */}
//             <label
//               htmlFor="email"
//               className="block sm:text-xs lg:text-base font-medium"
//             >
//               What is your email?
//             </label>
//             <input
//               id="email"
//               className="w-full p-3 mt-2 bg-gray-100 rounded-lg"
//               type="email"
//               placeholder="email@example.com"
//             />

//             {/* Password Input */}
//             <label
//               htmlFor="password"
//               className="block sm:text-xs lg:text-base font-medium mt-4"
//             >
//               What is your password?
//             </label>
//             <input
//               id="password"
//               className="w-full p-3 mt-2 bg-gray-100 rounded-lg"
//               type="password"
//               placeholder="password"
//             />

//             {/* Login Button */}
//             <div className="w-full flex justify-center">
//               <button className="bg-black w-[60%] sm:text-sm text-white py-4 rounded-lg mt-6 flex items-center justify-center hover:bg-gray-800 transition">
//                 <span className="mr-2 sm:text-sm lg:text-xl font-medium">
//                   Login
//                 </span>
//                 <svg
//                   version="1.1"
//                   id="Right_Arrow"
//                   xmlns="http://www.w3.org/2000/svg"
//                   xmlnsXlink="http://www.w3.org/1999/xlink"
//                   x="0px"
//                   y="0px"
//                   viewBox="0 0 512 512"
//                   xmlSpace="preserve"
//                   className="w-5 h-5"
//                   fill="white"
//                 >
//                   <path d="M430.75,234l-131.3-103.39c-12.15-9.57-29.75-7.47-39.32,4.68c-9.57,12.15-7.47,29.75,4.68,39.32l69.42,54.67 H98.57c-15.46,0-28,12.54-28,28s12.54,28,28,28H331L264.8,337.4c-12.15,9.57-14.24,27.17-4.68,39.32 c5.52,7.02,13.73,10.68,22.02,10.68c6.06,0,12.17-1.96,17.3-6L430.75,278c6.74-5.31,10.68-13.42,10.68-22 C441.43,247.42,437.49,239.31,430.75,234z" />
//                 </svg>
//               </button>
//             </div>
//           </form>
//         </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserLogin;
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, setuser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newuser = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      newuser
    );
    if (response.status === 200) {
      const data = response.data;
      setuser(data.user);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/start");
      console.log("login success");
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="h-full w-full bg-gradient-to-br bg-white flex items-center justify-center p-4 align-middle">
      <div className="bg-white w-full  justify-center rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        <div className="bg-white w-full  h-[100vh] rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden ">
          <div className=" absolute justify-start items-center m-2 ">
            <img
              className="backimg w-16 sm:w-20 bg-hide lg:pt-6 lg:ml-6 lg:w-28"
              src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
              alt="Uber Logo"
            />
          </div>
          {/* Left side - Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 my-auto">
            <div className="space-y-6 my-auto items-center justify-center">
              {/* Traffic Light Logo */}

              <form
                onSubmit={handleSubmit}
                className=" lg:text-2xl space-y-6 mt-4 lg:w-[80%] mx-auto  "
              >
                <div>
                  <h2 className="lg:text-3xl text-xl font-bold flex justify-center  text-gray-900 ">
                    Welcome to Login page
                  </h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-lg font-medium  text-gray-700 mt-10 mb-2">
                      User Email
                    </label>
                    <div className="mt-1 relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="mt-1 relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    className="text-sm font-medium text-red-600 hover:text-red-500"
                  >
                    Forgot password?
                  </button>
                </div>

                <div>
                  <button
                    type="submit"
                    className={`w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all ${
                      isLoading ? "opacity-75 cursor-wait" : ""
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Sign in
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>

                <div>
                  <Link
                    to="/captainlogin"
                    className={`w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg text-white bg-yellow-700 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all ${
                      isLoading ? "opacity-75 cursor-wait" : ""
                    }`}
                    disabled={isLoading}
                  >
                    <>
                      Sign-in As Captain
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  </Link>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
                >
                  <img
                    src="https://image.similarpng.com/very-thumbnail/2021/09/Logo-Search-Google--on-transparent-background-PNG.pnghttps://image.similarpng.com/very-thumbnail/2021/09/Logo-Search-Google--on-transparent-background-PNG.png"
                    alt="Google"
                    className="h-5 w-5 mr-2"
                  />
                  Sign in with Google
                </button>
              </form>
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/usersignup"
                  className="font-medium text-red-600 hover:text-red-500"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </div>

          {/* Right side - Traffic Lights Image */}
          <div className="hidden md:block w-1/2 relative overflow-hidden">
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-20 z-10"></div>

            {/* Traffic lights themed background */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900 z-20"></div>

            {/* Main image */}
            <img
              src="https://media.istockphoto.com/id/92272747/photo/traffic-light-on-street-with-red-signal-lit-up.jpg?s=612x612&w=0&k=20&c=_Vd6TFuZDjISe3HbQ0cl46pvkg8D4sTK9pKxB26Wxpo="
              alt="Traffic lights at night"
              className="w-full h-full object-cover animate-fade-in"
            />

            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 text-center text-white">
              <div className="flex flex-col items-center space-y-4">
                <h3 className="text-4xl font-bold">Uber</h3>
                <div className="flex space-x-2">
                  <div className="w-6 h-6 rounded-full bg-red-500 animate-pulse"></div>
                  <div className="w-6 h-6 rounded-full bg-yellow-500 animate-pulse delay-75"></div>
                  <div className="w-6 h-6 rounded-full bg-green-500 animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;

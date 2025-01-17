import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Captaindatacontext } from "../context/Captaincontext";
const Captainlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { captain, setCaptain } = React.useContext(Captaindatacontext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const captain = {
      password: password,
      email: email,
    };
    const response = await axios.post(
      "http://localhost:4000/captains/login",
      captain
    );

    if (response.status == 200) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captainhome" );
    }
    console.log("hello");

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
                      Captain Email
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
                    className={`w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg text-white bg-yellow-700 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all ${
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
                  to={"/captainsignup"}
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
              src="https://cdn.motor1.com/images/mgl/yMVyG/s1/ubermoto.webp"
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

export default Captainlogin;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CaptainSignup = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const captain = {
        fullname,
        email,
        password,
      };
      const response = await axios.post(
        "http://localhost:4000/captains/login",
        captain
      );
      console.log(response.status);
      
      if (response.status === 200) {
        toast.success("Signup successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/captainhome");
        }, 2000);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-br bg-white flex items-center justify-center p-4 align-middle">
      <ToastContainer />
      <div className="bg-white w-full justify-center rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        <div className="bg-white w-full h-[100vh] rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
          <div className="absolute justify-start items-center m-2">
            <img
              className="backimg w-16 sm:w-20 bg-hide lg:pt-6 lg:ml-6 lg:w-28"
              src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
              alt="Uber Logo"
            />
          </div>
          {/* Left side - Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 my-auto">
            <div className="space-y-6 my-auto items-center justify-center">
              <form
                onSubmit={handleSubmit}
                className="lg:text-2xl space-y-6 mt-4 lg:w-[80%] mx-auto"
              >
                <div>
                  <h2 className="lg:text-3xl text-xl font-bold flex justify-center text-gray-900">
                    Welcome to Signup Page
                  </h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mt-10 mb-2">
                      Full Name
                    </label>
                    <div className="mt-1 relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
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
                        Sign up
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to={"/captainsignup"}
                  className="font-medium text-red-600 hover:text-red-500"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
          {/* Right side - Image */}
          <div className="hidden md:block w-1/2 relative overflow-hidden">
            <img
              src="https://cdn.motor1.com/images/mgl/yMVyG/s1/ubermoto.webp"
              alt="Uber background"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;

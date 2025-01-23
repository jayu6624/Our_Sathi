import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserSignup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, setuser } = React.useContext(UserDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newuser = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newuser
      );

      if (response.status === 201) {
        const data = response.data;
        setuser(data.user);

        // Show success toast
        toast.success("Registration successful! Redirecting...", {
          position: "top-right",
          autoClose: 3000,
        });

        setTimeout(() => {
          navigate("/start");
        }, 3000); // Delay for user to see the notification
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Show error toast
        toast.error(error.response.data.message || "User already exists! Please try to log in.", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error("An unexpected error occurred. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-br bg-white flex items-center justify-center p-4 align-middle">
      <ToastContainer />
      <div className="bg-white w-full h-[100vh] justify-center rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        {/* Logo repositioned to the top-left corner */}
        <div className="absolute top-7 left-8">
          <img
            className="w-16 lg:w-28"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Logo"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 my-auto">
          <div className="space-y-3 my-auto items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="lg:text-2xl space-y-6 mt-4 lg:w-[80%] mx-auto"
            >
              <div>
                <h2 className="lg:text-3xl text-xl font-bold flex justify-center text-gray-900">
                  Sign Up
                </h2>
              </div>

              {/* First Name Input */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <div className="mt-1 relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                    placeholder="Enter your first name"
                    required
                  />
                </div>
              </div>

              {/* Last Name Input */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <div className="mt-1 relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Email
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

              {/* Password Input */}
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
                      Sign up
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/userlogin"
                  className="font-medium text-red-600 hover:text-red-500"
                >
                  Log in here
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Right side - Traffic Lights Image */}
        <div className="hidden md:block w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900 z-20"></div>
          <img
            src="https://media.istockphoto.com/id/92272747/photo/traffic-light-on-street-with-red-signal-lit-up.jpg?s=612x612&w=0&k=20&c=_Vd6TFuZDjISe3HbQ0cl46pvkg8D4sTK9pKxB26Wxpo="
            alt="Traffic lights at night"
            className="w-full h-full object-cover animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
};

export default UserSignup;

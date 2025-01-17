import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Lock,
  Mail,
  User,
  Palette,
  Truck,
  Package,
  Shield,
} from "lucide-react";
import { Captaindatacontext } from "../context/Captaincontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainSignup = () => {
  const navigate = useNavigate();
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicalColor, setVehicalColor] = useState("");
  const [vehicalType, setVehicalType] = useState("");
  const [vehicalCapacity, setVehicalCapacity] = useState("");
  const [vehicalPlate, setVehicalPlate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { captain, setCaptain } = React.useContext(Captaindatacontext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const captaindata = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicalColor,
        vehicletype: vehicalType,
        capacity: vehicalCapacity,
        plate: vehicalPlate,
      },
    };

    try {
      const response = await axios.post(
        `http://localhost:4000/captains/register`,
        captaindata
      );
      console.log("-------------------");
      console.log(captaindata);

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captainhome");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="h-full w-full bg-gradient-to-br bg-white flex items-center justify-center p-4 align-middle"
      style={{ overflow: "hidden", height: "auto" }}
    >
      <div className="bg-white w-full justify-center rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 my-auto overflow-y-auto h-full flex flex-col justify-start relative">
          {/* Uber Logo */}
          <div className="absolute top-0 left-0 p-4 z-10">
            <img
              className="w-16 sm:w-20 lg:w-28"
              src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
              alt="Uber Logo"
            />
          </div>

          <div className="space-y-6 my-auto items-center justify-center w-full ">
            <form
              onSubmit={handleSubmit}
              className="lg:text-2xl space-y-6 mt-4 lg:w-[80%] mx-auto"
            >
              <div className="p-8">
                <div>
                  <h2 className="lg:text-3xl text-xl font-bold flex justify-center text-gray-900">
                    Create Your Account
                  </h2>
                </div>
                <div className="space-y-4">
                  {/* Inputs */}
                  {[
                    {
                      label: "First Name",
                      type: "text",
                      value: firstname,
                      setValue: setfirstname,
                      placeholder: "Enter your name",
                      Icon: User,
                    },
                    {
                      label: "last Name",
                      type: "text",
                      value: lastname,
                      setValue: setlastname,
                      placeholder: "Enter your name",
                      Icon: User,
                    },
                    {
                      label: "Email",
                      type: "email",
                      value: email,
                      setValue: setEmail,
                      placeholder: "Enter your email",
                      Icon: Mail,
                    },
                    {
                      label: "Password",
                      type: "password",
                      value: password,
                      setValue: setPassword,
                      placeholder: "Enter your password",
                      Icon: Lock,
                    },
                    {
                      label: "Vehicle Color",
                      type: "text",
                      value: vehicalColor,
                      setValue: setVehicalColor,
                      placeholder: "Enter vehicle color",
                      Icon: Palette,
                    },
                    {
                      label: "Vehicle Plate",
                      type: "text",
                      value: vehicalPlate,
                      setValue: setVehicalPlate,
                      placeholder: "Enter vehicle plate",
                      Icon: Shield,
                    },
                    {
                      label: "Vehicle Type",
                      type: "dropdown",
                      value: vehicalType,
                      setValue: setVehicalType,
                      options: ["Car", "Auto", "Motorcycle"], // Dropdown options
                      Icon: Truck,
                    },
                    {
                      label: "Vehicle Capacity",
                      type: "number",
                      value: vehicalCapacity,
                      setValue: setVehicalCapacity,
                      placeholder: "Enter vehicle capacity",
                      Icon: Package,
                    },
                  ].map(
                    ({
                      label,
                      type,
                      value,
                      setValue,
                      placeholder,
                      options,
                      Icon,
                    }) => (
                      <div key={label}>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                          {label}
                        </label>
                        <div className="mt-1 relative">
                          {Icon && (
                            <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          )}
                          {type === "dropdown" ? (
                            <select
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                              className={`block w-full ${
                                Icon ? "pl-12" : "pl-4"
                              } pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 text-lg focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white`}
                              required
                            >
                              <option value="" disabled>
                                {placeholder}
                              </option>
                              {options.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={type}
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                              className={`block w-full ${
                                Icon ? "pl-12" : "pl-4"
                              } pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 text-lg focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white`}
                              placeholder={placeholder}
                              required
                            />
                          )}
                        </div>
                      </div>
                    )
                  )}

                  {/* Submit Button */}
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
                </div>
              </div>
            </form>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to={"/captainlogin"}
                className="font-medium text-red-600 hover:text-red-500"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>

        {/* Right side - Traffic Lights Image */}
        <div className="hidden md:block w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900 z-20"></div>
          <img
            src="https://cdn.motor1.com/images/mgl/yMVyG/s1/ubermoto.webp"
            alt="Traffic lights at night"
            className="w-full h-full object-cover animate-fade-in"
          />
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
  );
};

export default CaptainSignup;

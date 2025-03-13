import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Home() {
  const services = [
    {
      id: 1,
      title: "Ride",
      description:
        "Get a ride in minutes. Choose from a variety of ride options.",
      image:
        "https://t3.ftcdn.net/jpg/03/04/41/80/360_F_304418095_oYl68WmnLkMz1hq692AkjBBnkELOvOja.jpg",
      link: "/ride",
    },
    {
      id: 2,
      title: "Food Delivery",
      description:
        "Order food from your favorite restaurants and get it delivered fast.",
      image:
        "https://enatega.com/wp-content/uploads/2024/02/Why-Do-People-Prefer-Food-Delivery-Apps_-10-Main-Reasons-2-1024x512.webp",
      link: "/food-delivery",
    },
    {
      id: 3,
      title: "Package Delivery",
      description:
        "Send packages quickly and reliably with our delivery service.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsKcJ7LauQ9tyYsIUm3IKhiZJR1bKhZ4V8jw&s",
      link: "/package-delivery",
    },
    {
      id: 4,
      title: "Car Rental",
      description: "Rent a car for your personal or business trips with ease.",
      image:
        "https://media.istockphoto.com/id/1419724017/photo/car-rental-agency-employee-giving-car-keys-to-beautiful-young-woman.jpg?s=612x612&w=0&k=20&c=fmJXUDhx3AGaQoa_pr3bLqliyhX6yKD3WFXPkLbSDyw=",
      link: "/car-rental",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Hero Section */}
      <section
        className="h-screen flex items-center justify-center text-white relative bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600320254374-ce2d293c324e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
        <div className="text-center px-8 relative z-10">
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">
            Welcome to Our_<span className="text-blue-400  ">साथी</span>{" "}
            Services
          </h1>
          <p className="text-lg mb-8">
            Fast, Safe, and Always साथ Your Journey, Our Commitment!
          </p>
          <Link
            to="/userlogin"
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {services.map((service) => (
            <Link
              to={service.link}
              key={service.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-32 sm:h-40 md:h-56 object-cover"
              />
              <div className="p-3 sm:p-6">
                <h3 className="text-lg sm:text-2xl font-semibold mb-2 text-gray-800">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;

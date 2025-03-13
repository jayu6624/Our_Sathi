import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h2 className="text-2xl font-bold">Our_साथी</h2>
          <p className="text-sm text-gray-400">Fast, Safe, and Always साथ Your Journey, Our Commitment!</p>
        </div>
        <div className="flex space-x-4">
          <Link to="/ride" className="hover:text-blue-400">Ride</Link>
          <Link to="/food-delivery" className="hover:text-blue-400">Food Delivery</Link>
          <Link to="/package-delivery" className="hover:text-blue-400">Package Delivery</Link>
          <Link to="/car-rental" className="hover:text-blue-400">Car Rental</Link>
        </div>
        <div className="text-center sm:text-right mt-4 sm:mt-0">
          <p className="text-sm">© {new Date().getFullYear()} Our_साथी. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

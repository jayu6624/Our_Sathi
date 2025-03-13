import React, { useState, useEffect } from "react";
import { Menu, X, User, Shield } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.reload();
  };

  const toggleLoginOptions = (e) => {
    e.stopPropagation();
    setShowLoginOptions(!showLoginOptions);
  };

  return (
    <nav className="text-slate-300 p-4 w-full relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold font-serif text-black">
          Our_<span className="text-blue-400">साथी</span>
        </div>

        <div className="hidden md:flex space-x-6 text-lg text-black font-semibold">
          <a href="/" className="hover:underline">
            Ride
          </a>
          <a href="#" className="hover:underline">
            Drive
          </a>
          <a href="#" className="hover:underline">
            Business
          </a>
          <a href="#" className="hover:underline">
            About
          </a>
        </div>

        <div className="hidden md:flex items-center space-x-4 font-semibold text-black">
          <a href="#" className="hover:underline">
            🌍 EN
          </a>
          <a href="#" className="hover:underline">
            Help
          </a>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-full font-medium"
            >
              Log out
            </button>
          ) : (
            <>
              <button onClick={toggleLoginOptions} className="hover:underline">
                Log in
              </button>
              <button className="bg-black text-white px-4 py-2 rounded-full font-medium">
                Sign up
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-black"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 space-y-4 text-center text-black">
          <a href="#" className="block hover:underline">
            Ride
          </a>
          <a href="#" className="block hover:underline">
            Drive
          </a>
          <a href="#" className="block hover:underline">
            Business
          </a>
          <a href="#" className="block hover:underline">
            About
          </a>
          <hr className="border-gray-600" />
          <a href="#" className="block hover:underline">
            🌍 EN
          </a>
          <a href="#" className="block hover:underline">
            Help
          </a>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-full font-medium w-full"
            >
              Log out
            </button>
          ) : (
            <>
              <button
                onClick={toggleLoginOptions}
                className="block hover:underline w-full"
              >
                Log in
              </button>
              <button className="bg-black text-white px-4 py-2 rounded-full font-medium w-full">
                Sign up
              </button>
            </>
          )}
        </div>
      )}

      {showLoginOptions && !isAuthenticated && (
        <div className="absolute top-16 right-4 md:right-16 bg-white text-black p-4 rounded-lg shadow-lg space-y-2 w-64 z-50">
          <a
            href="/userlogin"
            className="flex items-center hover:bg-gray-200 p-2 rounded text-center space-x-2"
          >
            <User size={20} />
            <span>Log in as User</span>
          </a>
          <a
            href="/captainlogin"
            className="flex items-center hover:bg-gray-200 p-2 rounded text-center space-x-2"
          >
            <Shield size={20} />
            <span>Log in as Captain</span>
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

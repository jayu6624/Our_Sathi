import React, { useContext } from "react";
import { Link } from "react-router-dom";


function Home() {
  return (
    <div>
      <div className="h-screen w-full flex flex-col bg-red-700 pt-8 bg-[url('https://media.istockphoto.com/id/526811099/vector/traffic-lights.webp?b=1&s=612x612&w=0&k=20&c=0I55Hr-Ls4yVopz26tTW3KJiJmc3O3EEASnlJEahXr4=')] lg:bg-[url('https://img.freepik.com/premium-photo/traffic-light-with-green-light-lit-up_845018-6727.jpg')] bg-center bg-no-repeat bg-cover">
        {/* Top content */}
        <div className="flex justify-start items-center px-4">
          <img
            className="backimg w-16 sm:w-20 bg-hide lg:pt-2 lg:ml-6 lg:w-28"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Logo"
          />
        </div>

        {/* Bottom content */}
        <div className="bg-white text-lg sm:text-2xl font-medium font-bold py-5 px-5 sm:py-7 sm:px-10 mt-auto rounded-t-2xl shadow-lg">
          <h2 className="text-center">Get started with Uber</h2>
          <Link
            to="/userlogin"
            className="bg-black w-full text-white py-3 sm:py-4 lg:py-5 rounded-lg mt-5 flex items-center justify-center hover:bg-gray-800 transition text-sm sm:text-base lg:text-lg"
          >
            <span className="mr-2">Continue</span>
            <svg
              version="1.1"
              id="Right_Arrow"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              className="w-6 h-6"
              fill="white"
            >
              <path d="M430.75,234l-131.3-103.39c-12.15-9.57-29.75-7.47-39.32,4.68c-9.57,12.15-7.47,29.75,4.68,39.32l69.42,54.67 H98.57c-15.46,0-28,12.54-28,28s12.54,28,28,28H331L264.8,337.4c-12.15,9.57-14.24,27.17-4.68,39.32 c5.52,7.02,13.73,10.68,22.02,10.68c6.06,0,12.17-1.96,17.3-6L430.75,278c6.74-5.31,10.68-13.42,10.68-22 C441.43,247.42,437.49,239.31,430.75,234z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

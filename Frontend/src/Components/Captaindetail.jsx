import React from "react";
import { LogOut, Clock, Gauge, NotebookPen } from "lucide-react";
function Captaindetail() {
  return (
    <div>
      {" "}
      <div className="h-[40vh] p-2">
        <div className=" p-4 h-[15vh]">
          <div className="flex justify-between">
            <div className="flex  w-full justify-between">
              <div className="flex ">
                <img
                  src="https://img.freepik.com/premium-photo/face-smiling-indian-man_130568-534.jpg"
                  className="w-16 h-16 rounded-full flex"
                  alt=""
                />
                <p className=" flex ml-2 text-lg font-semibold items-center">
                  Jaydeep Rathod
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h4 className="font-semibold text-md ">₹290.20</h4>
                <p className="flex justify-center text-sm text-opacity-55">
                  Earned
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[19vh] flex ">
          <div className="flex justify-around  p-4 bg-[#ffc100ba] w-[90%] m-auto rounded-xl font-semibold ">
            <div className="flex flex-col items-center font-semibold ">
              <Clock className="opacity-60" />
              <p>10.2</p>
              <p className="text-xs font-thin"> Hours</p>
            </div>
            <div className="flex flex-col items-center">
              <Gauge className="opacity-60" />
              <p>39.3 Km</p>
              <p className="text-xs font-thin"> Distance</p>
            </div>
            <div className="flex flex-col items-center">
              <NotebookPen className="opacity-60" />
              <p>6</p>
              <p className="text-xs font-thin">Notes </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Captaindetail;

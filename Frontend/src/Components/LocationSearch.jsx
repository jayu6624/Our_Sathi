import React from "react";
import { LocateFixed } from "lucide-react";

function LocationSearch({ setvehicle, setIsExpanded }) {
  const locations = [
    "F/704 - Shilpan Reva, Umasadan Road, Near by University Road Rajkot",
    "A/101 - Harmony Complex, Kalavad Road, Opp. Silver Palace Rajkot",
    "B/302 - Pearl Tower, Yagnik Road, Near Central Mall Rajkot",
    "C/503 - Galaxy Residency, Airport Road, Near Crystal Mall Rajkot",
  ];

  return (
    <div className="space-y-4 ">
      {locations.map((location, index) => (
        <button
          onClick={() => {
            setvehicle(true);
          }}
        >
          <div
            key={index}
            className="flex hover:border-black hover:bg-slate-600"
            onClick={() => {
              setvehicle(true);
            }}
          >
            <h2 className="flex mr-2 lg:w-12 w-16 rounded-3xl items-center justify-center h-10 bg-[#eee]">
              <LocateFixed />
            </h2>
            <div className="flex items-center justify-between text-start">
              {location}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default LocationSearch;

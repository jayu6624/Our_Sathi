import React from "react";
import { LocateFixed } from "lucide-react";

function LocationSearch() {
  const locations = [
    "F/704 - Shilpan Reva, Umasadan Road, Near by University Road Rajkot",
    "A/101 - Harmony Complex, Kalavad Road, Opp. Silver Palace Rajkot",
    "B/302 - Pearl Tower, Yagnik Road, Near Central Mall Rajkot",
    "C/503 - Galaxy Residency, Airport Road, Near Crystal Mall Rajkot",
  ];

  return (
    <div className="space-y-4">
      {locations.map((location, index) => (
        <div key={index} className="flex">
          <h2 className="flex mr-2 lg:w-12 w-16 rounded-3xl items-center justify-center h-10 bg-[#eee]">
            <LocateFixed />
          </h2>
          <div className="flex items-center justify-between">
            {location}
          </div>
        </div>
      ))}
    </div>
  );
}

export default LocationSearch;

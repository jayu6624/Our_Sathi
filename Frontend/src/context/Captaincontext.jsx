import React, { useState, useContext, createContext } from "react";

export const Captaindatacontext = createContext();

// Optional custom hook for using context
export const useCaptain = () => {
  const context = useContext(Captaindatacontext);
  if (!context) {
    throw new Error("useCaptain must be used within a CaptainProvider");
  }
  return context;
};

function Captaincontext({ children }) {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCaptain = (captainData) => {
    setCaptain(captainData);
  };

  const value = {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateCaptain,
  };

  return (
    <Captaindatacontext.Provider value={value}>
      {children}
    </Captaindatacontext.Provider>
  );
}

export default Captaincontext;

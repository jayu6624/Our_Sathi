import React from "react";
import { createContext } from "react";
import { useState } from "react";

export const UserDataContext = createContext();

export function UserContext({ children }) {
  const [user, setuser] = useState({
    email: "",
    fullname: {
      firstname: "",
      lastname: "",
    },
  });

  return (
    <div>
      <UserDataContext.Provider value={{ user, setuser }}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
}

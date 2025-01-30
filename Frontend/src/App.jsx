import React from "react";
import { Route, Routes } from "react-router-dom";
import CaptainSignup from "./pages/CaptainSignup";
import Captainlogin from "./pages/Captainlogin";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import Start from "./pages/Start";
import Userprotected from "./pages/Userprotected";
import Userlogout from "./pages/Userlogout";
import CaptainHome from "./pages/CaptainHome";
import Waitfordriver from "./Components/Waitfordriver";
import Riderunning from "./pages/Riderunning";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/captainlogin" element={<Captainlogin />} />
        <Route path="/usersignup" element={<UserSignup />} />
        <Route path="/captainsignup" element={<CaptainSignup />} />
        <Route
          path="/start"
          element={
            <Userprotected>
              <Start />
            </Userprotected>
          }
        />
        <Route
          path="/user/logout"
          element={
            <Userprotected>
              <Userlogout />
            </Userprotected>
          }
        />
        <Route path="/captainhome" element={<CaptainHome />} />
        <Route path="/riding" element={<Waitfordriver />} />
        <Route path="/riderunning" element={<Riderunning />} />
      </Routes>
    </div>
  );
}

export default App;

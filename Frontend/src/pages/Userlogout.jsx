import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Userlogout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log("token = " + token);

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      if (response.status === 200) {
        console.log("Logout successful");
        localStorage.removeItem("token");
        navigate("/userlogin");
      }
    })
    .catch((error) => {
      console.error(
        "Error during logout:",
        error.response?.data || error.message
      );
      if (error.response?.status === 401) {
        console.warn("Unauthorized: Invalid or expired token");
        localStorage.removeItem("token");
        navigate("/userlogin"); // Redirect to login page
      }
    });
  return <div>Userlogout</div>;
}

export default Userlogout;

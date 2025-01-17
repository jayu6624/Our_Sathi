import React, { useContext, useEffect, useState } from "react";
import { Captaindatacontext } from "../context/Captaincontext";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
function Captainprotected({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const {captain,setCaptain} = useContext(Captaindatacontext);
  const [isloading,setisloading] = useState(true);
  useEffect(() => {
    if (!token) {
      navigate("/userlogin");
    }
  }, [token]);

axios.get(`${import.meta.env.VITE_BASE_URL}/captains/getprofile`,{
  headers:{
    Authorization:`Bearer ${token}`
  }
})  .then((response)=>{
  if(response.status==200){
    const data = response.data;
    setCaptain(data.captain);
    setisloading(false);
  }
}).catch(err=>{
  console.log(err);

  
})

if(isloading){
  return <div>loading</div>
}

  return <>{children}</>;
}

export default Userprotected;

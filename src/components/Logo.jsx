import React from "react";
import logo from "../assets/megaBlogIcon2.png";

function Logo({ width = "100px" }) {
  return (
    <div className="flex items-center gap-4">
      <img width="35px" height="35px" src={logo} alt="MegaBlog" />
      <span className="text-xl font-inter-regular font-black text-black">InkInsights</span>
    </div>
  );
}

export default Logo;

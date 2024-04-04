import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-orange-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-3 rounded-lg font-bold ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

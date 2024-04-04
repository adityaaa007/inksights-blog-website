import React from "react";
import authService from "../../appwrite/authService";
import { logout } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = (e) => {
    e.preventDefault();

    authService
      .logout()
      .then(() => dispatch(logout()))
      .catch((error) => console.log("Logout error: " + error));
  };

  return (
    <button
      onClick={logoutHandler}
      className="bg-orange-600 inline-block px-6 py-2 duration-200 hover:bg-orange-500 rounded-full text-white"
    >
      Sign out
    </button>
  );
}

export default LogoutBtn;

import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import authService from "./appwrite/authService";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/auth/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-white font-inter-regular">
      <div className="w-full min-h-screen flex flex-col justify-between">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <Loader></Loader>
  );
}

export default App;

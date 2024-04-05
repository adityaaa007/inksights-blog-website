import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/authService";
import { login as authLogin } from "../features/auth/authSlice";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import blogAnim3 from "../assets/blog_anim3.json";
import Loader from "./Loader";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    setLoading(true);
    setError("");
    // console.log("data: " + data.password);
    try {
      const session = await authService.loginWithEmail(data);
      if (session) {
        const userData = await authService.getCurrentUser();

        // console.log("userData: " + JSON.stringify(userData));
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return !loading ? (
    <div className="flex items-center justify-center w-full">
      <div className="w-1/2">
        <Player
          autoplay
          loop
          src={blogAnim3}
          style={{ height: "350px", width: "350px" }}
        >
          <Controls
            visible={false}
            buttons={["play", "repeat", "frame", "debug"]}
          />
        </Player>
      </div>
      <div className=" w-1/2 max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 my-4">
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-4 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:text-orange-600"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              placeholder="Email address"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Loader text="Logging in"></Loader>
  );
}

export default Login;

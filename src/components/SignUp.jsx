import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/authService";
import { login } from "../features/auth/authSlice";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import blogAnim3 from "../assets/blog_anim3.json";
import Loader from "./Loader";

function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const create = async (data) => {
    setLoading(true);
    setError("");
    try {
      console.log("Creating account...");
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      console.log("error: " + error);
    }
    setLoading(false);
  };

  return !loading ? (
    <div className="flex items-center justify-center">
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
      <div
        className={`w-1/2 max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 my-4`}
      >
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-4 text-center text-base text-black/60 mb-4">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:text-orange-600"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              placeholder="Full name"
              {...register("name", {
                required: true,
              })}
            />
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
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Loader text="Creating account"></Loader>
  );
}

export default SignUp;

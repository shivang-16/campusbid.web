"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInSchema } from "@/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2, Lock, User } from "lucide-react";
import { toast } from "sonner";
import GoogleLoginButton from "@/app/(auth)/_components/GoogleLoginButton";
import { useAppDispatch } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";
import Image from "next/image";
import loginimage from "../../../../../public/assets/images/loginimage.jpg";

const Login = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onFormSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsLoggingIn(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        dispatch(userData(responseData.user));
        toast.success(responseData.message);
        router.replace("/");
      } else {
        const errorData = await response.json();
        toast.error("Login Failed", {
          description: errorData.message,
        });
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Login Failed", {
        description: error.response ? error.response?.data.message : error.message,
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#d4d0c4" }} className="min-h-screen flex flex-col items-center justify-center font-poppins px-5">
      <div className="flex">
        <div className="flex-1 hidden lg:flex justify-center items-center">
          <Image
            src={loginimage}
            alt="Login background"
            width={600} // Adjust based on container size and aspect ratio
            height={600} // Adjust based on container size and aspect ratio
            className="object-cover opacity-90"
          />
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div style={{ backgroundColor: "#dedacd" }} className="w-full max-w-md space-y-8 rounded-3xl shadow-lg py-10 px-5 md:py-10 md:px-10 bg-opacity-90">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text flex justify-center items-center bg-gradient-to-r from-teal-600 to-teal-500 tracking-wide mb-2 gap-2 ">
                <Image
                  src="/assets/images/campusbid_logo.ico"
                  alt="Campus Bid Logo"
                  width={48}
                  height={48}
                />CampusBid
              </h1>
              <p className="text-gray-600 text-sm pt-4">
                Connect, Collaborate, and Achieve with CampusBid!
              </p>
            </div>

            <form onSubmit={form.handleSubmit(onFormSubmit)} className="mt-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block relative">
                    <User className="absolute left-3 top-3.5 w-5 h-5 opacity-70" />
                    <input
                      style={{ backgroundColor: "#fffbee" }}
                      type="text"
                      placeholder="Enter your email address"
                      {...form.register("email")}
                      className="w-full p-3  pl-10 border rounded-lg flex items-center focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-600 text-sm mt-1">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </label>
                </div>

                <div>
                  <label className="block relative">
                    <Lock className="absolute left-3 top-3.5 w-5 h-5 opacity-70" />
                    <input
                      style={{ backgroundColor: "#fffbee" }}
                      type={togglePassword ? "text" : "password"}
                      placeholder="Enter password"
                      {...form.register("password")}
                      className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                    />
                    <span
                      onClick={() => setTogglePassword(!togglePassword)}
                      className="cursor-pointer absolute right-3 top-3 text-gray-400"
                    >
                      {togglePassword ? <EyeOff /> : <Eye />}
                    </span>
                    {form.formState.errors.password && (
                      <p className="text-red-600 text-sm mt-1">
                        {form.formState.errors.password.message}
                      </p>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="remember-password" />
                  <label htmlFor="remember-password" className="text-sm">
                    Remember Me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-teal-600 hover:text-teal-700 text-sm">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <span className="flex items-center">
                    <Loader2 className="w-6 h-6 animate-spin mr-2" /> Signing in
                  </span>
                ) : (
                  "Log In"
                )}
              </button>
            </form>

            <div className="flex items-center justify-between mt-4">
              <span className="border-b w-1/5 lg:w-1/4 border-gray-300"></span>
              <span className="text-xs text-center text-gray-600 uppercase">
                Or Login with
              </span>
              <span className="border-b w-1/5 lg:w-1/4 border-gray-300"></span>
            </div>

            <GoogleLoginButton className="flex items-center justify-center w-full py-3 mt-4 border rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all transform hover:scale-105" />

            <p className="text-center text-sm mt-4">
              Don’t have an account?{" "}
              <Link href="/signup" className="text-teal-600 hover:text-teal-700">
                Register here
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;

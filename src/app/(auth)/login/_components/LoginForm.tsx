"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { signInSchema } from "@/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

import { Eye, EyeOff, Loader2, Lock, User } from "lucide-react";
import { toast } from "sonner";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GoogleLoginButton from "@/app/(auth)/_components/GoogleLoginButton";

import { useAppDispatch } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";

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
      console.log(error);

      toast.error("Login Failed", {
        description: error.response
          ? error.response?.data.message
          : error.message,
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-6">
        {/* Logo with "Campus Bid" Text */}
        <div className="flex items-center space-x-3">
          <Image
            src="/assets/images/campusbid_logo.ico"
            alt="Campus Bid Logo"
            width={50}
            height={50}
          />
          <h2 className="text-3xl font-bold text-gray-800">Campus Bid</h2>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-10 space-y-6 border border-gray-200">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">Welcome Back</h3>
            <p className="text-sm text-gray-600">We are glad to see you with us</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        icon1={<User className="w-5 h-5 opacity-70" />}
                        className="text-lg border border-gray-300 focus:ring-0 focus:border-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type={togglePassword ? "text" : "password"}
                        placeholder="Password"
                        icon1={<Lock className="w-5 h-5 opacity-70" />}
                        icon2={
                          <div
                            className="cursor-pointer"
                            onClick={() => setTogglePassword(!togglePassword)}
                          >
                            {togglePassword ? <EyeOff className="w-5 h-5 opacity-70" /> : <Eye className="w-5 h-5 opacity-70" />}
                          </div>
                        }
                        className="text-lg border border-gray-300 focus:ring-0 focus:border-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox id="remember-password" />
                  <label htmlFor="remember-password" className="text-sm">
                    Remember Me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-primary text-sm">
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full text-lg h-12 bg-primary text-white rounded-lg"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <span className="flex items-center">
                    <Loader2 className="w-6 h-6 animate-spin mr-2" /> Signing in
                  </span>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>

          <GoogleLoginButton />

          <div className="text-center text-sm">
            <p>
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

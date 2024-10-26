"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Key, Loader2, Mail, User } from "lucide-react";
import { signUpSchema } from "@/schemas/signUpSchema";
import logo from "../../../../../public/assets/images/campusbid_logo.jpeg"
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "@/app/(auth)/_components/GoogleLoginButton";
import { signUpUser } from "@/actions/user_actions";
import signupimage from "../../../../../public/assets/images/signupimage.jpg";
const SignUp = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const onFormSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);

    try {
      const responseData = await signUpUser(data);

      if (responseData.success) {
        toast.success(responseData.message);
        localStorage.setItem("email", data.email);
        router.replace("/verify");
      } else {
        toast.error(responseData.message);
      }
    } catch (error: any) {
      toast.error("Error registering user.", {
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen font-poppins flex flex-col items-center justify-center bg-white px-5">
      <div className="flex justify-around">
        <div className="flex-1 flex justify-center items-center">
          <div className="w-full max-w-md space-y-8 bg-white rounded-3xl shadow-lg py-10 px-5 md:py-10 md:px-10 bg-opacity-90">
            <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text flex justify-center items-center bg-gradient-to-r from-teal-600 to-teal-500 tracking-wide mb-2 ">
                <Image
                  src="/assets/images/campusbid_logo.ico"
                  alt="Campus Bid Logo"
                  width={70}
                  height={70}
                />CampusBid
              </h1>
              <p className="text-gray-600 text-sm pt-4">
                Connect, Collaborate, and Achieve with CampusBid!
              </p>
            </div>

            <form onSubmit={form.handleSubmit(onFormSubmit)} className="mt-6 space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-5 h-5 opacity-70" />
                  <input
                    type="text"
                    placeholder="Enter full name"
                    className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                    {...form.register("name")}
                  />
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.name?.message}</p>
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 opacity-70" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                    {...form.register("email")}
                  />
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.email?.message}</p>
                </div>

                <div className="relative">
                  <Key className="absolute left-3 top-3.5 w-5 h-5 opacity-70" />
                  <input
                    type={togglePassword ? "text" : "password"}
                    placeholder="Create password"
                    className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                    {...form.register("password")}
                  />
                  <div
                    className="cursor-pointer absolute right-3 top-3.5 text-gray-400"
                    onClick={() => setTogglePassword(!togglePassword)}
                  >
                    {togglePassword ? <EyeOff /> : <Eye />}
                  </div>
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.password?.message}</p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <Loader2 className="w-6 h-6 animate-spin mr-2" /> Signing Up
                  </span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            <div className="flex items-center justify-between mt-4">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <span className="text-xs text-center text-gray-500 uppercase">
                Or Sign Up with
              </span>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>

            <GoogleLoginButton className="flex items-center justify-center w-full py-3 mt-4 bg-white border rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all transform hover:scale-105" />

            <div className="text-center text-sm mt-4">
              <p>
                Already have an account?{" "}
                <Link href="/login" className="text-teal-600 hover:text-teal-700">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 hidden lg:flex justify-center items-center">
          <Image
            src={signupimage}
            alt="Login background"
            width={600} // Adjust based on container size and aspect ratio
            height={600} // Adjust based on container size and aspect ratio
            className="object-cover opacity-90"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;

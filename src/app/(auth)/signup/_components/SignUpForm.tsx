"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Key, Loader2, Mail, User } from "lucide-react";
import { signUpSchema } from "@/schemas/signUpSchema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "@/app/(auth)/_components/GoogleLoginButton";
import { signUpUser } from "@/actions/user_actions";

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
        <div className="bg-white rounded-lg max-w-md w-full p-8 space-y-6 shadow-lg">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">Create an account</h3>
            <p className="text-sm text-gray-600">
              Unlock your potential with expert guidance—sign up for mentorship today!
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onFormSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter full name"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        icon1={<Mail className="w-5 h-5 opacity-70" />}
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
                        placeholder="Create password"
                        icon1={<Key className="w-5 h-5 opacity-70" />}
                        icon2={
                          <div
                            className="cursor-pointer"
                            onClick={() => setTogglePassword(!togglePassword)}
                          >
                            {togglePassword ? (
                              <EyeOff className="w-5 h-5 opacity-70" />
                            ) : (
                              <Eye className="w-5 h-5 opacity-70" />
                            )}
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

              <Button
                type="submit"
                className="w-full text-lg h-12 bg-primary text-white rounded-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" /> Signing Up
                  </span>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </Form>

          <GoogleLoginButton />

          <div className="text-center text-sm">
            <p>
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

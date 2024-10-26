import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "CampusBid | Auth",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className="h-main-height">{children}</section>;
}

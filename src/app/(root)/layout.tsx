import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "CampusBid",
  description:
    "Get Work Done, One Bid at a Time – Connect, Collaborate, and Achieve with CampusBid!",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className="h-main-height">{children}</section>;
}

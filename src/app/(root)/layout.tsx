import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "CampusBid",
  description:
    "Get Work Done, One Bid at a Time – Connect, Collaborate, and Achieve with CampusBid!",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  <div className="md:ml-20 xl:ml-[261px] h-main-height pl-4 pr-4 md:pr-2">
  {children}
  </div>
}

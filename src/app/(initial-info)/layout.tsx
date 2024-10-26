import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CampusBid | Initial Info",
  description:
    "Get Work Done, One Bid at a Time – Connect, Collaborate, and Achieve with CampusBid!",
};


export default function InitialInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-main-height">{children}</div>;
}

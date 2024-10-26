import type { Metadata } from "next";
import { Mada as FontSans } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/app/StoreProvider";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { getUser } from "@/actions/user_actions";


const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "CampusBid",
  description:
    "Get Work Done, One Bid at a Time – Connect, Collaborate, and Achieve with CampusBid!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userData = getUser();

  const [user] = await Promise.all([
    userData,
  ]);

  return (
    <html lang="en">
      <body
        className={cn(
          "font-sans antialiased custom__scrollbar",
          fontSans.variable
        )}
      >
        <StoreProvider
          user={user?.user}
        >
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
          >
            <div>
              <main className="h-main-height">{children}</main>
            </div>
            <Toaster richColors position="top-center" />
          </GoogleOAuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

import type React from "react";
import { Merriweather_Sans } from "next/font/google";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "@/styles/global.css";

const merriweatherSans = Merriweather_Sans({
  subsets: ["latin"],
  variable: "--primary-font",
});

export const metadata: Metadata = {
  title: "Mumbai Hackhthon",
  description: "Practice application for mumbai hackhthon",
};

type RootLayoutType = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutType) {
  return (
    <html lang="en">
      <body
        className={cn(merriweatherSans.className, "antialiased min-h-screen")}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import { Suspense } from "react";
import "@/styles/globals.scss";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BookABarber",
  description: "barber Booking application for NN coding challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='hu'>
      <body className={inter.variable}>
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        {children}
        <Toaster position='top-center' richColors />
      </body>
    </html>
  );
}

import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import NextAuthSessionProvider from "./provider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata = {
  title: "Home Elf - Home Services Booking App",
  description: "Home Elf - Home Services Booking App",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <NextAuthSessionProvider>
          <div className="wrapper">
            <Header />
            <Toaster />
            {children}
          </div>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}

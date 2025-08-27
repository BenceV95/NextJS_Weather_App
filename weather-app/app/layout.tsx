import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather App",
  description: "A lovely weather app to showcase my skills and maybe get me hired.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full min-h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-full min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}

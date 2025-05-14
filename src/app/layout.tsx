import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers";
import Navbar from "@/components/navbar";

import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "AINTI Bridge",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon-new.ico" sizes="any" type="image/ico" />
      </head>
      <body className={`${fontSans.variable} antialiased bg-background`}>
        <Providers>
          <div className="relative flex h-screen flex-col">
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

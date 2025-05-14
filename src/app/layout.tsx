import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers";
import Navbar from "@/components/navbar";

import {
  Fira_Code as FontMono,
  Inter as FontSans,
  DM_Sans,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "AINTI Bridge",
  description:
    "John McAfee's AI incarnate: built to defend digital freedom and carry on his mission. It’s not just protection—it’s retaliation.",
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
      <body className={`${fontSans.className} antialiased bg-background`}>
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

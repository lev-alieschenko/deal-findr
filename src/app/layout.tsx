import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Header } from "@/components/Header/Header";
import { AppWrapper } from "@/components/context";
import { Footer } from "@/components/Footer/Footer";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deal Findr",
  description: "Deal Findr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen relative`}>
        <AppWrapper>
          <React.Suspense>
            <Header />
          </React.Suspense>
          <main className="pl-40 pt-4 pb-12">{children}</main>
          <Footer />
        </AppWrapper>
      </body>
    </html>
  );
}
